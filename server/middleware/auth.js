import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(400).json({ message: 'Please log in to continue' });

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne(verify.id);

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error getting the User!' });
  }
};
