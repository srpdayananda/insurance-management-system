import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../src/user/user.model";

export default {
  async connect() {
    try {
      await mongoose.connect(
        "mongodb://localhost/insurance_management_system",
        { useNewUrlParser: true }
      );
      const user1 = await User.findOne({ email: "admin@union.com" });
      console.log("🚀...Database connected successfully...🚀");
      const password = await bcrypt.hash("12345678", 10);
      if (!user1) {
        await User.create({
          email: "admin@union.com",
          firstName: "admin",
          lastName: "Union",
          password: password,
          role: "MANAGER",
          accessToken: null,
        });
        const user2 = await User.findOne({ email: "advisor@union.com" });
        if (!user2) {
          await User.create({
            email: "advisor@union.com",
            firstName: "advisor",
            lastName: "union",
            password: password,
            role: "ADVISOR",
            accessToken: null,
          });
        }
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  },
};
