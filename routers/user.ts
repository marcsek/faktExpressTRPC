import { protectedProcedure, router } from '../trpc';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRouter = router({
  greeting: protectedProcedure.query(req => {
    return { greeting: req.ctx.user };
  }),
  getUser: protectedProcedure.query(async req => {
    const user = await prisma.user.findUnique({ where: { id: req.ctx.user } });

    return user;
  }),
});
