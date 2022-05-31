import express from 'express';
import cors from 'cors';

import DB from './config/db';

import auth from './middleware/auth';

import { authRouter } from './src/auth';
import { userRouter } from './src/user';
import { policyRouter } from './src/policy'

const app = express();
const port = 3000;

DB.connect();
app.use(express.json());
app.use(cors());

app.use('/login', authRouter);
app.use('/user', auth, userRouter);
app.use('/policy', auth, policyRouter)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
