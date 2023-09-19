import User from '../models/UserModel.js';
import Order from '../models/orderModel.js';

export const createOrders = async (req, res) => {
  try {
    const { userId, cart, shippingAddress, totalPrice, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: 'Please log in to place a order!' });

    const products = cart.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: 'order created succesfully' });
  } catch (error) {
    console.log('error creating orders', error);
    res.status(500).json({ message: 'Error creating orders' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId)
      res.status(404).json({ message: 'Please log in to get your orders!' });

    const order = await Order.find({ user: userId }).populate('user');

    if (!order || order.length === 0) {
      res.status(404).json({ message: 'No order found for this user!' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Please log in to get your orders!' });
  }
};
