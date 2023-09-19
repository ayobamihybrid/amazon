import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { activateUser, register } from './controllers/userController.js';
import ErrorHandler from './utils/ErrorHandler.js';
import userRouter from './router/user.js';
import orderRouter from './router/order.js';

const app = express();
const port = 8000;
const DB = process.env.MONGO_URL;

// app.use(cors());
app.use(
  cors({
    origin: 'http://192.168.222.198:8081',
    credentials: true,
  })
);

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to MongoDB
mongoose
  .connect('mongodb+srv://tnenas07:ecommerce@cluster0.vizu8ko.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('conected to MongoDB'))
  .catch((err) => {
    console.log('Error connecting to mongoDB', err);
  });

// Error handling

// app.use(ErrorHandler)

// Routes
app.use('/', userRouter);
app.use('/', orderRouter);

// Creating a port
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
