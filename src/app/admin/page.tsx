// app/admin/page.tsx
import jwt from 'jsonwebtoken';
import Dashboard from '@/component/AdminComponent/Dashboard/dashboard';
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

  const user = jwt.verify(token, secret) as { name: string };
  console.log('User:', user);
  return (
    <>
      <div className="text-center w-full pt-10 text-font-secondary min-h-[100vh] bg-amber-500  z-20 overflow-hidden">
        <h1 className="text-2xl font-bold text-font-primary">
          Welcome, {user.name}!
        </h1>
        <p className="mt-4 text-lg capitalize">
          Showcase your thoughts and ideas here.
        </p>

        <div className="mt-8">
          <Dashboard name={user.name} />
        </div>
      </div>
    </>
  );
}
