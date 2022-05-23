import express from "express";
import bcrypt from "bcrypt";

import { RoleEnum } from "../common/enums/role";
import { IRequest } from "./../common/interfaces/request";
import User from "./user.model";
import isManager from "../common/permissions/isManager";

export default {
  async createUser(req: IRequest, res: express.Response) {
    try {
      const isManagerRole = await isManager(req.user.userId);
      if (!isManagerRole) {
        return res.status(400).send({
          success: false,
          message: "You Have not Permission",
        });
      }

      const reqBody = req.body;
      const errors = [];
      if (!reqBody.email) {
        errors.push("Email is required");
      }
      if (!reqBody.firstName) {
        errors.push("First Name is required");
      }
      if (!reqBody.lastName) {
        errors.push("Last Name is required");
      }
      if (!reqBody.password) {
        errors.push("Password is required");
      }
      if (reqBody.password && !(reqBody.password.length > 7)) {
        errors.push("Password is minium 8 characters");
      }

      const roleKeys = Object.keys(RoleEnum).includes(reqBody.role);
      if (!roleKeys) {
        errors.push(
          "Please enter valid role.. Valid role are MANAGER & ADVISOR"
        );
      }

      const foundUser = await User.findOne({ email: req.body.email });
      if (foundUser) {
        errors.push("User with Email is already added");
      }
      if (errors.length > 0) {
        return res.status(400).send({
          success: false,
          message: "Failed User Created",
          errors: errors,
        });
      }
      if (!foundUser) {
        const bPassword = await bcrypt.hash("12345678", 10);
        await User.create({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: bPassword,
          role: req.body.role,
          accessToken: null,
        });
      }

      return res.status(200).send({
        success: true,
        message: "User Created Successfully",
      });
    } catch (error) {
      return res.status(400).send({ success: false, message: "Internal server error" });
    }
  },

  async getUsers(req: IRequest, res: express.Response) {
    try {
      const isManagerRole = await isManager(req.user.userId);
      if (!isManagerRole) {
        return res.status(400).send({
          success: false,
          message: "You Have not Permission",
        });
      }
      const foundUsers = await User.find();
      const modifyUser = foundUsers.map((user: any) => {
        return { id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }
      })

      return res.status(200).send({
        success: true,
        message: "User Getting Successfully",
        users: modifyUser,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Internal server error",
      });
    }
  },
  async updateUser(req: IRequest, res: express.Response) {
    try {
      const isManagerRole = await isManager(req.user.userId);
      if (!isManagerRole) {
        return res.status(400).send({
          success: false,
          message: "You Have not Permission",
        });
      }
      const foundUser = await User.findOne({ _id: req.body.id });
      if (!foundUser) {
        return res.status(400).send({
          success: false,
          message: "Failed User Updated!",
          errors: ["couldn't find relevant UserId"],
        });
      }
      const query = { _id: req.body.id };
      const newValue = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      const updateUser = await User.updateOne(query, newValue);
      return res.status(200).send({
        success: true,
        message: "User Updated Successfully",
        user: updateUser
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Internal server error",
      });
    }
  },
  async deleteUser(req: IRequest, res: express.Response) {
    try {
      const isManagerRole = await isManager(req.user.userId);
      if (!isManagerRole) {
        return res.status(400).send({
          success: false,
          message: "You Have not Permission",
        });
      }

      const foundUser = await User.findOne({ _id: req.query.id });
      if (!foundUser) {
        return res.status(400).send({
          success: false,
          message: "Failed User Deleted!",
          errors: ["couldn't find relevant UserId"],
        });
      }

      await User.deleteOne({ _id: req.query.id });
      return res.status(200).send({
        success: true,
        message: "User Deleted Successfully",
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Internal server error",
      });
    }
  },
  async getUserData(req: IRequest, res: express.Response) {
    try {
      const foundUser = await User.findOne({ _id: req.query._id });

      if (foundUser) {
        return res.status(200).send({
          success: true,
          message: "Get User Details Successfully",
          user: foundUser,
        });
      } else {
        return false;
      }
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
