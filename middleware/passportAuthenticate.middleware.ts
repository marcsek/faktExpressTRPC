import { TRPCError } from '@trpc/server';
import passport, { AuthenticateOptions, Strategy } from 'passport';
import { middleware } from '../trpc';

export const passPortMiddleware = (strategy: string | string[] | Strategy, options: AuthenticateOptions) => {
  return middleware(async ({ ctx, next }) => {
    const user = await new Promise((resolve, reject) => {
      passport.authenticate(strategy, options, (err, user) => {
        if (err) return reject(err);
        resolve(user);
      })(ctx.req, ctx.res, next);
    }).catch((err: TRPCError) => {
      throw new TRPCError(err);
    });

    return next({ ctx: user });
  });
};
