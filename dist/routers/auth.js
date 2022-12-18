"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.googleRoute = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("../jwt");
const trpc_1 = require("../trpc");
const passportAuthenticate_middleware_1 = require("../middleware/passportAuthenticate.middleware");
const expressRouter = (0, express_1.Router)();
exports.googleRoute = expressRouter.get('/google', passport_1.default.authenticate('google', { scope: ['profile'], session: false }));
exports.authRouter = (0, trpc_1.router)({
    google: (0, trpc_1.router)({
        callback: trpc_1.publicProcedure.use((0, passportAuthenticate_middleware_1.passPortMiddleware)('google', { scope: ['profile'], session: false })).query(req => {
            const user = req.ctx.user;
            if (user) {
                console.log('tutok', req.ctx.req.user);
                const accessToken = (0, jwt_1.createAccessToken)({ userId: user }, { expiresIn: '1h' });
                req.ctx.res.cookie('jit', accessToken, {
                    maxAge: 3_600_000,
                    httpOnly: true,
                    secure: false,
                });
                return 'success';
            }
        }),
    }),
    login: trpc_1.publicProcedure.use((0, passportAuthenticate_middleware_1.passPortMiddleware)('local', { session: false })).query(req => {
        const user = req.ctx.user;
        if (user) {
            const accessToken = (0, jwt_1.createAccessToken)({ userId: user }, { expiresIn: '1h' });
            req.ctx.res.cookie('jit', accessToken, {
                maxAge: 3_600_000,
                httpOnly: true,
                secure: false,
            });
            return `success ${accessToken}`;
        }
    }),
    logout: trpc_1.publicProcedure.query(req => {
        req.ctx.res.clearCookie('jit');
        return true;
    }),
});
