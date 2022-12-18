"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_local_1 = __importDefault(require("passport-local"));
const client_1 = require("@prisma/client");
const server_1 = require("@trpc/server");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const LocalStrategy = passport_local_1.default.Strategy;
const prisma = new client_1.PrismaClient();
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'trpc/auth.google.callback',
}, async (_acessToken, _refreshToken, profile, done) => {
    let user;
    if (profile) {
        try {
            user = await prisma.user.upsert({
                where: { name: profile.displayName },
                create: { name: profile.displayName },
                update: {},
            });
        }
        catch (err) {
            done(new server_1.TRPCError({ message: 'User alredy exists', code: 'CONFLICT' }), undefined);
        }
        return done(null, user?.id);
    }
    done(new server_1.TRPCError({ message: 'No profile supplied', code: 'BAD_REQUEST' }), profile);
}));
passport_1.default.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    let user;
    if (username && password) {
        try {
            user = await prisma.user.findUnique({ where: { name: username } });
        }
        catch (err) {
            done(new server_1.TRPCError({ message: 'User alredy exists', code: 'CONFLICT' }), undefined);
        }
        if (user) {
            return done(null, user.id);
        }
    }
    done(new server_1.TRPCError({ message: 'Incorrect credentials format', code: 'BAD_REQUEST' }), user);
}));
exports.default = passport_1.default;
