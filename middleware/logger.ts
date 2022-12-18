import { middleware } from '../trpc';
import chalk from 'chalk';

export const logger = middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;

  result.ok
    ? console.log(
        chalk.green(
          `OK request timing: ${chalk.reset(
            `(path: ${chalk.underline('%s')}, type: ${chalk.underline('%s')}, duration: ${chalk.underline('%sms')})`
          )}`
        ),
        path,
        type,
        durationMs
      )
    : console.log(
        chalk.red(
          `Non-OK request timing: ${chalk.reset(
            `(path: ${chalk.underline('%s')}, type: ${chalk.underline('%s')}, duration: ${chalk.underline('%sms')})`
          )}`
        ),
        path,
        type,
        durationMs
      );
  return next({ ctx: { user: 'pica' } });
});
