import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { profile } from 'console';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const secret = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!token || !secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, secret);
    if (typeof user === 'object' && user !== null) {
      return NextResponse.json({
        id: (user as jwt.JwtPayload).id,
        name: (user as jwt.JwtPayload).name,
        email: (user as jwt.JwtPayload).email,
        profileImage: (user as jwt.JwtPayload).profileImage || null,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid token payload' },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
