import connectDB from '@/lib/config/db';
import User from '@/lib/models/UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return new Response('User not found', { status: 404 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return new Response('Invalid credentials', { status: 401 });

  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!jwtSecret) {
    return new Response('JWT secret not configured', { status: 500 });
  }
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    jwtSecret,
    {
      expiresIn: '1d',
    },
  );

  return new Response(
    JSON.stringify({ token, user: { name: user.name, email: user.email } }),
  );
}
