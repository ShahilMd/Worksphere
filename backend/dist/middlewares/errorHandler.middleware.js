"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_config_1 = require("../config/http.config");
const appError_1 = require("../utils/appError");
const errorHandler = (error, req, res, next) => {
    console.log(`Error Occured On PATH: ${req.path}`, error);
    if (error instanceof SyntaxError) {
        return res.status(http_config_1.HTTPSTATUS.BAD_REQUEST).json({
            message: "Syntax error, Invalid JSON format please check your request body",
            details: error.message
        });
    }
    if (error instanceof ReferenceError) {
        return res.status(http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Internal reference error",
            details: error.message
        });
    }
    if (error instanceof RangeError) {
        return res.status(http_config_1.HTTPSTATUS.BAD_REQUEST).json({
            message: "Invalid range in input",
            details: error.message
        });
    }
    if (error instanceof appError_1.AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
        });
    }
    return res.status(http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "internal server error",
        error: error?.message || "Unknown error"
    });
};
exports.errorHandler = errorHandler;
