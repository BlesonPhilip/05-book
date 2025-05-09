import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config("./.env");
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => console.log(e));

export default mongoose;
