import connectDB from '@/lib/config/db';
import User from '@/lib/models/UserModel.js';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectDB();
  const { name, email, password } = await req.json();
  const existingUser = await User.findOne({ email });
  if (existingUser) return new Response('User exists', { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();

  return new Response(JSON.stringify({ msg: 'User registered' }), {
    status: 201,
  });
}
