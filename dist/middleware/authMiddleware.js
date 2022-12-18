"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const server_1 = require("@trpc/server");
const jwt_1 = require("../jwt");
const trpc_1 = require("../trpc");
exports.authMiddleware = (0, trpc_1.middleware)(async ({ ctx: { req, res }, next }) => {
    const token = req.cookies.jit;
    if (token) {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        return next({ ctx: { user: payload.userId } });
    }
    throw new server_1.TRPCError({ message: 'Not authenticated', code: 'UNAUTHORIZED' });
});
