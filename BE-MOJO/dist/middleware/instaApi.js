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
exports.getConvoList = exports.insta_basic = exports.tempTokenToPermToken = exports.codeToTempToken = void 0;
const client_secret = process.env.client_secret || '9b5d141339e47f6bfbed329b3b9d7d48';
// TEMP ACCESS TOKEN
const codeToTempToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: '1169547817377137',
                client_secret: `${client_secret}`,
                grant_type: 'authorization_code',
                redirect_uri: 'https://localhost:5173/auth/token/',
                code: code,
            }).toString(),
        });
        if (!response.ok) {
            console.log(response.json);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
    }
    catch (e) {
        console.log('Error Temp Access Token:', e);
        return undefined;
    }
});
exports.codeToTempToken = codeToTempToken;
// TO GET LONG-TERM ACCESS TOKEN
const tempTokenToPermToken = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${accessToken}`, { method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data.access_token;
    }
    catch (e) {
        console.log("some Error getting perm Access Token", e);
        throw new Error(`Error Temp To Perm Access Token`);
    }
});
exports.tempTokenToPermToken = tempTokenToPermToken;
const insta_basic = (access_token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield fetch(`https://graph.instagram.com/v22.0/me?fields=id,username,name,profile_picture_url,followers_count,follows_count,media_count&access_token=${access_token}`);
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = yield resp.json();
        return data;
    }
    catch (e) {
        console.log("Error fetching basic Instagram data:", e);
        throw e;
    }
});
exports.insta_basic = insta_basic;
const getConvoList = (access_token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield fetch(`https://graph.instagram.com/v22.0/me/conversations?platform=instagram&access_token=${access_token}`);
        const data = resp.json();
        return data;
    }
    catch (e) {
    }
});
exports.getConvoList = getConvoList;
