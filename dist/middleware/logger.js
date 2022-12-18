"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const trpc_1 = require("../trpc");
const chalk_1 = __importDefault(require("chalk"));
exports.logger = (0, trpc_1.middleware)(async ({ path, type, next }) => {
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;
    result.ok
        ? console.log(chalk_1.default.green(`OK request timing: ${chalk_1.default.reset(`(path: ${chalk_1.default.underline('%s')}, type: ${chalk_1.default.underline('%s')}, duration: ${chalk_1.default.underline('%sms')})`)}`), path, type, durationMs)
        : console.log(chalk_1.default.red(`Non-OK request timing: ${chalk_1.default.reset(`(path: ${chalk_1.default.underline('%s')}, type: ${chalk_1.default.underline('%s')}, duration: ${chalk_1.default.underline('%sms')})`)}`), path, type, durationMs);
    return next({ ctx: { user: 'pica' } });
});
