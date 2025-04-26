import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    image: {
      type: String,
      trim: true,
      default: "http://localhost:3000/img/user.jpeg",
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // optional: ensures stronger passwords
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
    },
  },
  { timestamps: true }
);

const User = model("users", userSchema);
export default User;
