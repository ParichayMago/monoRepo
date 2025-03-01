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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConvoList = exports.userInfo = exports.handleAuth = exports.testing = void 0;
const instaApi_1 = require("../middleware/instaApi");
const testing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "Working" });
    }
    catch (e) {
        res.json({ "error": e });
    }
});
exports.testing = testing;
const handleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Api hit");
        const body = req.body;
        // checking for token 
        let permToken = req.cookies.token;
        let user_id;
        // if not Found Token get Token
        if (!permToken) {
            // Creating 
            const code = body.code;
            console.log("This is code:", code);
            let temp = yield (0, instaApi_1.codeToTempToken)(code);
            console.log("This is temp: ", temp);
            if (!temp) {
                res.status(500).json({ error: "api error" });
                return;
            }
            user_id = temp.user_id;
            // const existingUser:IUser | boolean = await findUser(`${temp.user_id}`);
            // inside if person to mongo
            permToken = yield (0, instaApi_1.tempTokenToPermToken)(temp.access_token);
            console.log("this is the permToken: ", permToken);
            // if(!existingUser) {
            //   if(!permToken) {
            //     throw new Error("api Error")
            //   }
            //   await createUser(temp.user_id, permToken);
            // } 
        }
        const user_basic = yield (0, instaApi_1.insta_basic)(permToken);
        console.log("this is user_baic ", user_basic);
        res.cookie("token", permToken, { maxAge: 50000, httpOnly: true });
        res.json({ success: true, user_basic, accessToken: permToken });
        return;
    }
    catch (e) {
        return console.log(e);
    }
});
exports.handleAuth = handleAuth;
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        const user_basic = yield (0, instaApi_1.insta_basic)(token);
        console.log("user ", user_basic);
        res.json({ user_basic, success: true });
    }
    catch (e) {
        res.json({ error: e, success: false });
    }
});
exports.userInfo = userInfo;
const userConvoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        const convoList = yield (0, instaApi_1.getConvoList)(token);
        res.json({ convoList, success: true });
    }
    catch (e) {
        res.json({ error: e, success: false });
    }
});
exports.userConvoList = userConvoList;
