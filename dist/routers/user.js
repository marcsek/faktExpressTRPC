"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../trpc");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.userRouter = (0, trpc_1.router)({
    greeting: trpc_1.protectedProcedure.query(req => {
        return { greeting: req.ctx.user };
    }),
    getUser: trpc_1.protectedProcedure.query(async (req) => {
        const user = await prisma.user.findUnique({ where: { id: req.ctx.user } });
        return user;
    }),
});
