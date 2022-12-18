"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.publicProcedure = exports.mergeRoutes = exports.middleware = exports.router = exports.t = exports.createContext = void 0;
const server_1 = require("@trpc/server");
const createContext = ({ req, res }) => ({ req, res });
exports.createContext = createContext;
exports.t = server_1.initTRPC.context().create();
exports.router = exports.t.router;
exports.middleware = exports.t.middleware;
exports.mergeRoutes = exports.t.mergeRouters;
const logger_1 = require("./middleware/logger");
exports.publicProcedure = exports.t.procedure.use(logger_1.logger);
const authMiddleware_1 = require("./middleware/authMiddleware");
exports.protectedProcedure = exports.publicProcedure.use(authMiddleware_1.authMiddleware);
