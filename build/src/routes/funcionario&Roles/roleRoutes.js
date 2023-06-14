"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = __importDefault(require("../../controllers/funcionario&Roles/roleController"));
const loginRequired_1 = __importDefault(require("../../middlewares/login/loginRequired"));
const router = (0, express_1.default)();
router.post('/', roleController_1.default.create);
router.get('/', loginRequired_1.default, roleController_1.default.show);
router.get('/:id', roleController_1.default.index);
exports.default = router;
