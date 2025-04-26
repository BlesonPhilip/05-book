import express from "express";

import Author from "../db/models/authorSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const author = await Author.find();
    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
