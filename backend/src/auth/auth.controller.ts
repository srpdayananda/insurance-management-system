import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { TOKEN_KEY } from '../../config/constants';

import User from '../user/user.model';

export default {
  async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(400).send({
          success: false,
          error: 'Both email and password are required',
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({
          success: false,
          error: 'No registered user with the email address',
        });
      }
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res.status(400).send({
          success: false,
          error: 'You entered a wrong password',
        });
      }

      const token = jwt.sign({ userId: user._id, email }, TOKEN_KEY, {
        expiresIn: '1d',
      });
      await User.updateOne({ _id: user._id }, { accessToken: token });

      const userDetails = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        accessToken: token,
      };
      return res.status(200).send({
        success: true,
        message: 'Login successfully',
        user: userDetails,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error: 'Internal Server Error',
      });
    }
  },
};
