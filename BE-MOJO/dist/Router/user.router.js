"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../Controller/user.controller");
const userRouter = express_1.default.Router();
userRouter.get('/', user_controller_1.testing);
userRouter.get("/message");
// Get Access Token
userRouter.post('/handleAuth', user_controller_1.handleAuth);
// get user info
userRouter.get('/userInfo/:token', user_controller_1.userInfo);
exports.default = userRouter;
