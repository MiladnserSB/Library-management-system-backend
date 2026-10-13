import { Router } from "express";
import {
  createNewUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserByIdController,
} from "../controllers/UserController.js";

const userRouter = Router();
userRouter.route("/").get(getUsersController).post(createNewUserController);
userRouter
  .route("/:id")
  .get(getUserByIdController)
  .put(updateUserByIdController)
  .delete(deleteUserController);
// userRouter.get("/", getAllUsersController);
// userRouter.get("/:id", getUserByIdController);
// userRouter.post("/", createNewUserController);
// userRouter.put("/:id", updateUserByIdController);
// userRouter.delete("/:id", deleteUserController);
export default userRouter;
