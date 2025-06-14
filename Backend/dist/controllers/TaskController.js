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
exports.filterTaskforId = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const TaskModel_1 = __importDefault(require("../models/TaskModel"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield TaskModel_1.default.find();
        res.status(200).json(tasks);
        console.log("estas son las tareas", tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new TaskModel_1.default(req.body);
    try {
        const newTask = yield task.save();
        res.status(201).json(newTask);
        console.log("tarea agregada exitosamente", newTask);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updateTask = yield TaskModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateTask)
            throw new Error("Tarea no encontrada");
        res.status(200).json(updateTask);
        console.log("tarea actualizada", updateTask);
    }
    catch (e) {
        res.status(401).json({ message: e.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteTask = yield TaskModel_1.default.findByIdAndDelete(id);
        if (!deleteTask)
            throw new Error('tarea no encontrada');
        res.status(200).json(deleteTask);
        console.log("tarea eliminada con exito");
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
});
exports.deleteTask = deleteTask;
const filterTaskforId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const filterTaskforId = yield TaskModel_1.default.findById(id);
        if (!filterTaskforId)
            throw new Error("no se encontra la tarea con ese id");
        res.status(200).json(filterTaskforId);
        console.log("task encontrada", filterTaskforId);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
});
exports.filterTaskforId = filterTaskforId;
