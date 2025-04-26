import express from "express";
import authorRoutes from "./author-routes.js";
import bookRoutes from "./book-routes.js";
import userRoutes from "./user_routes.js"; // (Optional) if you have user auth routes

const router = express.Router();

// Use plural or descriptive route paths for clarity
router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
router.use("/users", userRoutes); // Optional, for signup/login

export default router;
