import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = cookies().get('token')?.value;
  const secret = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!token || !secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, secret);
    return NextResponse.json({ name: user.name, email: user.email });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
