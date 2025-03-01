"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUser = void 0;
const User_1 = __importDefault(require("../Model/User"));
const findUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ user_id: user_id });
        if (!user) {
            return false;
        }
        return user;
    }
    catch (e) {
        throw Error("Mongoose error");
    }
});
exports.findUser = findUser;
const createUser = (user_id, permAccessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.create({ user_id: user_id, accesss_token: permAccessToken });
        if (!user) {
            return false;
        }
        return true;
    }
    catch (e) {
        console.log("Error: ", e);
        throw new Error("Mongo New User Erro");
    }
});
exports.createUser = createUser;
