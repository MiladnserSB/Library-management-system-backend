import { Router } from "express";
import {
  createBorrowerController,
  deleteBorrowerController,
  getBorrowerByIdController,
  getAllBorrowersController,
  updateBorrowerController,
} from "../controllers/borrowerController.js";

const borrowerRouter = Router();
borrowerRouter
  .route("/")
  .get(getAllBorrowersController)
  .post(createBorrowerController);
borrowerRouter
  .route("/:id")
  .get(getBorrowerByIdController)
  .put(updateBorrowerController)
  .delete(deleteBorrowerController);

export default borrowerRouter;
