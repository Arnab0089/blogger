import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
  console.log('MongoDB connected');
};

export default connectDB;
