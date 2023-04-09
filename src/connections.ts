import { connect } from "mongoose";
import dotenv from "dotenv"

dotenv.config()
export const connectToDB = async () => {
  try {
    await connect(`${process.env.MONGO_LINK}`);
    console.log("db connected");
  } catch (err) {
    console.log("error connecting to DB", err);
  }
};