
import { NextFunction , Request , Response } from "express";
import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";


export const errorHandler:ErrorRequestHandler = (
  error:Error ,
  req:Request , 
  res:Response , 
  next:NextFunction
):any => {

  console.log(`Error Occured On PATH: ${req.path}`,error)

  if(error instanceof SyntaxError){
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Syntax error, Invalid JSON format please check your request body",
      details: error.message
    })
  }

  if (error instanceof ReferenceError) {
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal reference error",
    details: error.message
  });
}

if (error instanceof RangeError) {
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Invalid range in input",
    details: error.message
  });
}
if(error instanceof AppError) {
  return res.status(error.statusCode).json({
    message:error.message,
    errorCode:error.errorCode,
  });
}
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "internal server error",
    error : error?.message || "Unknown error"
  })
}