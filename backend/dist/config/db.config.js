"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const get_env_1 = require("../utils/get-env");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect((0, get_env_1.getEnv)("MONGO_URI"));
        console.log("Database connected");
    }
    catch (error) {
        console.log("Error connecting to database");
        process.exit(1);
    }
};
exports.default = connectDB;
