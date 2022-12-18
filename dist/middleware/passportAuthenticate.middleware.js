"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passPortMiddleware = void 0;
const server_1 = require("@trpc/server");
const passport_1 = __importDefault(require("passport"));
const trpc_1 = require("../trpc");
const passPortMiddleware = (strategy, options) => {
    return (0, trpc_1.middleware)(async ({ ctx, next }) => {
        const user = await new Promise((resolve, reject) => {
            passport_1.default.authenticate(strategy, options, (err, user) => {
                if (err)
                    return reject(err);
                resolve(user);
            })(ctx.req, ctx.res, next);
        }).catch((err) => {
            throw new server_1.TRPCError(err);
        });
        return next({ ctx: user });
    });
};
exports.passPortMiddleware = passPortMiddleware;
