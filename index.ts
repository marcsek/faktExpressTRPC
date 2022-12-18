import express, { Express } from 'express';
import { createContext } from './trpc';
import * as trpcExpress from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { appRouter } from './appRouter';
import { googleRoute } from './routers/auth';
import './passportSetup';

const app: Express = express();
const port = process.env.PORT ?? 3001;

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', googleRoute);
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
