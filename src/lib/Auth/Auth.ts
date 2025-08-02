// lib/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;

export async function getUserFromToken(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return null;

    const token = cookieHeader
      .split(';')
      .find((c) => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: any;
      _id: string;
      name: string;
      email: string;
      profileImage?: string;
    };

    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
