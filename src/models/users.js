import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, minLength: 5, maxLength: 50, lowercase: true },
  email: { type: String, unique: true },
  password: String,
  firstName: { type: String, minLength: 2, maxLength: 50 },
  lastName: { type: String, minLength: 2, maxLength: 50 },
  socialMedia: [String],
  website: { type: String },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user'],
  },
  bio: { type: String, minLength: 1, maxLength: 5000 },
  tel: { type: String, minLength: 4 },
});

export default mongoose.model('User', userSchema);
