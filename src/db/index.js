import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );
    console.log(
      `MONGODB Connected successfully! DB Host: ${connectionInstance.connection.host}`
    );
    console.log(`Database Name: ${DB_Name}`);
  } catch (error) {
    console.log("ERROR : ", error);
    process.exit(1);
  }
};
export default connectDB;
