import User from '../models/UserModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import sendMail from '../utils/sendMail.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sendToken from '../utils/sendToken.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //   Checking if emails already exist
    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(500).json({ mesage: 'User alrady exists!' });
    // return next(new ErrorHandler(500, 'User already exists!'));

    //   Check if all field was filled
    if (!name || !email || !password)
      return next(new ErrorHandler(404, 'All fields are required!'));

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: passwordHash,
    };

    const activationToken = jwt.sign(newUser, process.env.ACTIVATION_TOKEN, {
      expiresIn: '5m',
    });
    const activationUrl = `http://192.168.222.198:8000/activate/${activationToken}`;

    try {
      await sendMail({
        email: newUser.email,
        subject: 'Activate your account!',
        message: `Hello ${
          newUser.name.split(' ')[0]
        }, Please click on the link to activate your account: ${activationUrl}`,
      });

      res.status(201).json({
        mesage: `Please check your email: ${newUser.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Activate the User
export const activateUser = async (req, res, next) => {
  try {
    const activation_token = req.params.token;

    const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
    if (!user) return next(new ErrorHandler('Invalid activation token', 400));

    const { name, email, password } = user;

    const savedUser = new User({
      name,
      email,
      password,
    });

    savedUser.verified = true;
    await savedUser.save();

    sendToken(savedUser, 201, res);
    // const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    // const options = {
    //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //   sameSite: 'none',
    //   secure: true,
    // };

    // res.status(201).cookie('token', token, options).json({
    //   savedUser,
    //   token,
    // });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler('User does not exist!', 400));

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return next(new ErrorHandler('Incorrect credentials', 401));

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Get current User
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error retrieving the user!' });
  }
};

// Add address
export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: 'Please log in to continue!' });

    user.addresses.push(address);

    await user.save();

    res.status(200).json({ message: 'Address created succesfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding your address' });
  }
};

// Get user address
export const getAddress = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'Log in to continue' });

    const addresses = user.addresses;

    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: 'Please log in to continue' });
  }
};

// Edit User Address
export const editAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { addressId } = req.params;
    const { updatedAddress } = req.body;

    const user = await User.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ message: 'Please log in to edit your address!' });

    const address = user.addresses.id(addressId);

    if (!address) return res.status(404).json({ error: 'Address not found' });

    address.set(updatedAddress);

    await user.save();

    res.status(200).json({ message: 'Address updated successfully!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error updating address!' });
  }
};

// Delete User address

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId);
    if (!user)
      res.status(404).json({ message: 'Log in to delete this address!' });

    const address = user.addresses.id(addressId);

    user.addresses = user.addresses.filter(
      (address) => address.id !== addressId
    );

    await user.save();

    res.status(200).json({ message: 'Address deleted!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Unable to delete address!' });
  }
};
