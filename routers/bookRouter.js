import express from "express";
import { 
  getBooksController, 
  getAvailableBooksController, 
  createBookController, 
  updateBookController, 
  deleteBookController 
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooksController);
router.get("/available", getAvailableBooksController);
router.post("/", createBookController);
router.put("/:id", updateBookController);
router.delete("/:id", deleteBookController);

export default router;