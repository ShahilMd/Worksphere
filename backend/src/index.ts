import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config";
import connectDB from "./config/db.config";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestException, HttpException, UnauthorizedException } from "./utils/appError";


const app = express()

const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended : true }))

app.use(
  session({
    name:"session",
    keys:[config.SESSION_SECRET],
    maxAge:24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite :"lax",
  })
)

app.use(cors({
  origin: config.FRONTEND_ORIGIN,
  credentials: true,
}))

app.get(
  "/",
  asyncHandler(
    async(req: Request, res: Response, next: NextFunction) => {
      res.status(HTTPSTATUS.OK).json({
        message: "This is the home route",
      });
    }
  )
);

app.use(errorHandler);

app.listen(config.PORT,async ()=>{
  console.log(`Server is listing on port ${config.PORT}`)
  await connectDB();
})