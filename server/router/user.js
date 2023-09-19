import express from 'express';
import {
  activateUser,
  register,
  login,
  addAddress,
  getAddress,
  getUser,
  editAddress,
  deleteAddress,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.get('/activate/:token', activateUser);
router.post('/login', login);
router.post('/address', addAddress);
router.get('/profile/:userId', getUser);
router.get('/get-addresses/:userId', getAddress);
router.put('/edit-address/:userId/:addressId', editAddress);
router.delete('/delete-address/:userId/:addressId', deleteAddress);

export default router;
