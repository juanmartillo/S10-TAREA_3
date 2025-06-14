"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const diaries_1 = __importDefault(require("../src/routers/diaries"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Bienvenidos al arranque del servidor");
});
app.use('/task', diaries_1.default);
exports.default = app;
