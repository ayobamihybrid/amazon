import express from 'express';
import { createOrders, getOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', createOrders);

router.get('/get-orders/:userId/', getOrders);

export default router;
