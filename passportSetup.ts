import passport from 'passport';
import PassportGoogle from 'passport-google-oauth20';
import PassportLocal from 'passport-local';
import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

const GoogleStrategy = PassportGoogle.Strategy;
const LocalStrategy = PassportLocal.Strategy;

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'trpc/auth.google.callback',
    },
    async (_acessToken, _refreshToken, profile, done) => {
      let user;
      if (profile) {
        try {
          user = await prisma.user.upsert({
            where: { name: profile.displayName },
            create: { name: profile.displayName },
            update: {},
          });
        } catch (err) {
          done(new TRPCError({ message: 'User alredy exists', code: 'CONFLICT' }), undefined);
        }

        return done(null, user?.id);
      }

      done(new TRPCError({ message: 'No profile supplied', code: 'BAD_REQUEST' }), profile);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      let user;
      if (username && password) {
        try {
          user = await prisma.user.findUnique({ where: { name: username } });
        } catch (err) {
          done(new TRPCError({ message: 'User alredy exists', code: 'CONFLICT' }), undefined);
        }

        if (user) {
          return done(null, user.id);
        }
      }
      done(new TRPCError({ message: 'Incorrect credentials format', code: 'BAD_REQUEST' }), user);
    }
  )
);

export default passport;
