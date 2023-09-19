import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },

  addresses: [
    {
      name: String,
      mobileNo: String,
      houseNo: String,
      street: String,
      landmark: String,
      city: String,
      country: String,
      state: String,
      postalCode: String,
    },
  ],

  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model('User', userSchema);

export default User;
