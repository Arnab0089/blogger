// app/admin/page.tsx
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    // Optional: redirect instead of showing static text
    redirect('/login');
  }

  const secret = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!secret) {
    return <div>❌ Server Misconfiguration: Missing JWT Secret</div>;
  }

  try {
    const user = jwt.verify(token, secret) as { name: string };
    return (
      <>
        <div className="text-center mt-10 text-font-secondary h-[100vh]">
          <h1 className="text-2xl font-bold text-font-primary">
            Welcome, {user.name}!
          </h1>
          <p className="mt-4 text-lg capitalize">
            Showcase your thoughts and ideas here.
          </p>
        </div>
      </>
    );
  } catch (err) {
    return (
      <div className="flex items-center justify-center  text-center">
        <div className="border p-6 rounded-md bg-white shadow-md">
          <p className="mb-4 text-lg font-semibold">
            ❌ Invalid or expired token.
          </p>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }
}
