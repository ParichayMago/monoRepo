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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_router_1 = __importDefault(require("./Router/user.router"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
// Configure CORS first
app.use((0, cors_1.default)());
// Configure body parsing middleware with limits and error handling
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/user", user_router_1.default);
app.get("/api/auth/insta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    return;
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.json({ "message": "The Server is working" });
    return;
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await connectDb();
        console.log(`http://localhost:${port}`);
    }
    catch (e) {
        console.log("not connected to DB");
    }
}));
