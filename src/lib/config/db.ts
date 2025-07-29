import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
  if (!uri) {
    throw new Error(
      'NEXT_PUBLIC_MONGODB_URI environment variable is not defined',
    );
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

export default connectDB;
