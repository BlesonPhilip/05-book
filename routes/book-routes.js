import express from "express";
import Book from "../db/models/bookSchema.js";
import checkToken from "../middlewares/check-token.js";

const router = express.Router();

router.get("/", checkToken(["USER", "ADMIN"]), async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", checkToken(["ADMIN"]), async (req, res) => {
  try {
    const { body } = req;
    const book = await Book.create(body);
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
