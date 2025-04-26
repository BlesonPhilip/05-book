import { Schema, model } from "mongoose";

// Define the Book schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "authors", // Match the model name used in Author.js
    required: true,
  },
  image: {
    type: String,
    trim: true,
    default: "http://localhost:3000/img/book.jpeg",
  },
  edition: {
    type: String,
    enum: ["first", "second", "third"],
    default: "first",
  },
});

// Create and export the model
const Book = model("products", bookSchema);
export default Book;
