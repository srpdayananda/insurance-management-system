import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['MANAGER', 'ADVISOR'], default: 'ADVISOR' },
  accessToken: { type: String },
});

export default mongoose.model('user', userSchema);
