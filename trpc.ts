import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });
export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
export type Tt = typeof t;

export const router = t.router;
export const middleware = t.middleware;
export const mergeRoutes = t.mergeRouters;

import { logger } from './middleware/logger';
export const publicProcedure = t.procedure.use(logger);

import { authMiddleware } from './middleware/authMiddleware';
export const protectedProcedure = publicProcedure.use(authMiddleware);
