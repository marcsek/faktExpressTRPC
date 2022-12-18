"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.createRefreshToken = exports.createAccessToken = exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessPublicKey = Buffer.from(process.env.ACCESS_PUBLIC_KEY ?? '', 'base64').toString('ascii');
const accessPrivateKey = Buffer.from(process.env.ACCESS_PRIVATE_KEY ?? '', 'base64').toString('ascii');
const refreshPublicKey = Buffer.from(process.env.REFRESH_PUBLIC_KEY ?? '', 'base64').toString('ascii');
const refreshPrivateKey = Buffer.from(process.env.REFRESH_PRIVATE_KEY ?? '', 'base64').toString('ascii');
function signJwt(object, key, options) {
    return jsonwebtoken_1.default.sign(object, key, {
        ...options,
        algorithm: 'RS256',
    });
}
exports.signJwt = signJwt;
function verifyJwt(token, key) {
    return jsonwebtoken_1.default.verify(token, key);
}
exports.verifyJwt = verifyJwt;
const createAccessToken = (object, options) => {
    return signJwt(object, accessPrivateKey, options);
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (object, options) => {
    return signJwt(object, refreshPrivateKey, options);
};
exports.createRefreshToken = createRefreshToken;
const verifyAccessToken = (token) => {
    return verifyJwt(token, accessPublicKey);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return verifyJwt(token, refreshPublicKey);
};
exports.verifyRefreshToken = verifyRefreshToken;
