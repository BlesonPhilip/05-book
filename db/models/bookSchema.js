import { Schema, model } from "mongoose";

const bookSchema = Schema({
  title: String,
  description: String,
  price: Number,
  //   author: {
  //     type: Schema.Types.ObjectId,
  //     ref: "authors",
  //   },
  image: {
    type: String,
    trim: true,
    default: "http://localhost:3000/img/book.jpeg",
  },
});
const Book = model("product", bookSchema);
export default Book;
