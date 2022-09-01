import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, min: 5, max: 50 },
  email: { type: String, unique: true },
  password: String,
  firstName: { type: String, min: 2, max: 50 },
  lastName: { type: String, min: 2, max: 50 },
  socialMedia: [String],
  website: { type: String },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user'],
  },
});

export default mongoose.model('User', userSchema);
