'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      Cookies.set('token', data.token);
      localStorage.setItem('token', data.token);
      router.push('/admin');
    } else {
      setError(data.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex relative w-full  justify-center items-center min-h-screen bg-gray-100">
      <div className="absolute z-10 top-5 left-[30%] sm:top-20 sm:left-20  ">
        <Link href="/">
          <div className="tag-banner-box">
            <div className="tag-banner ">
              <Image
                src="/assest2/logo1.png"
                alt="Logo"
                width={180}
                height={60}
                className="hover:opacity-80 transition duration-300"
              />
            </div>
          </div>
        </Link>
      </div>
      <img
        src="/assest2/login.jpg"
        alt="Login Image"
        className="w-full h-full  rounded-lg shadow-md absolute top-0 left-0 object-cover opacity-90 "
      />
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded w-full max-w-md z-12 bg-gradient-to-b from-rose-500 to-blue-300 backdrop-blur-md shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800 font-family-primary">
          Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
