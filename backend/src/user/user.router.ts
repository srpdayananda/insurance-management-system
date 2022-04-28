import express from "express";

import UserController from "./user.controller";

export const userRouter = express.Router();

userRouter
  .route("/")
  .post(UserController.createUser)
  .get(UserController.getUsers)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

userRouter.route("/details").get(UserController.getUserData);
