import { TRPCError } from '@trpc/server';
import { verifyAccessToken } from '../jwt';
import { middleware } from '../trpc';

export const authMiddleware = middleware(async ({ ctx: { req, res }, next }) => {
  const token = req.cookies.jit;

  if (token) {
    const payload = verifyAccessToken(token);
    return next({ ctx: { user: (payload as any).userId } });
  }

  throw new TRPCError({ message: 'Not authenticated', code: 'UNAUTHORIZED' });
});
