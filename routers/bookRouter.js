import express from "express";
import {
  getBooksController,
  getAvailableBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
  getBookByIdController,
} from "../controllers/BookController.js";

const bookRouter = express.Router();

bookRouter.get("/", getBooksController);
bookRouter.get("/Available", getAvailableBooksController);
bookRouter.get("/:id", getBookByIdController);
bookRouter.post("/", createBookController);
bookRouter.put("/:id", updateBookController);
bookRouter.delete("/:id", deleteBookController);

export default bookRouter;
