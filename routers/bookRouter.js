import express from "express";
import { 
  getBooksController, 
  getAvailableBooksController, 
  createBookController, 
  updateBookController, 
  deleteBookController ,
  getBookByIdController
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooksController);
router.get("/available", getAvailableBooksController);
router.get("/:id", getBookByIdController);
router.post("/", createBookController);
router.put("/:id", updateBookController);
router.delete("/:id", deleteBookController);

export default router;