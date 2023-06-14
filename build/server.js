"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3001;
app_1.default.listen(port, () => {
    console.log();
    console.log('CONEXÃO COM SERVIDOR REALIZADA COM SUCESSO');
    console.log(`http://localhost:${port}`);
    console.log();
});
