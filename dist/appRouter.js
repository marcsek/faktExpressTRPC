"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
const user_1 = require("./routers/user");
const auth_1 = require("./routers/auth");
exports.appRouter = (0, trpc_1.router)({
    user: user_1.userRouter,
    auth: auth_1.authRouter,
});
