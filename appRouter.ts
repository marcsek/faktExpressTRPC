import { mergeRoutes, publicProcedure, router } from './trpc';
import { logger } from './middleware/logger';
import { z } from 'zod';
import { userRouter } from './routers/user';
import { authRouter } from './routers/auth';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
});
export type AppRouter = typeof appRouter;
