import mongoose from "mongoose"
import { getEnv } from "../utils/get-env";

const connectDB = async ()=>{
  try {
    await mongoose.connect(getEnv("MONGO_URI"));
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
}

export default connectDB