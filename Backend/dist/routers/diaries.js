"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../controllers/TaskController");
const router = express_1.default.Router();
router.get('/', TaskController_1.getTasks);
router.post('/addTask', TaskController_1.createTask);
router.put("/update/:id", TaskController_1.updateTask);
router.delete('/delete/:id', TaskController_1.deleteTask);
router.get("/:id", TaskController_1.filterTaskforId);
exports.default = router;
