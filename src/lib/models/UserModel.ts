// src/lib/models/UserModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
});

// ✅ Reuse existing model to prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
