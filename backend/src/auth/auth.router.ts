import express from 'express';
import AuthController from './auth.controller';

export const authRouter = express.Router();

authRouter.route('/').post(AuthController.login);
