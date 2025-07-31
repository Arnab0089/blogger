'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      const data = await res.json();
      setError(data.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
        onSubmit={handleRegister}
        className="bg-white p-8 rounded  w-full max-w-md z-12 bg-gradient-to-b from-rose-500 to-blue-300 backdrop-blur-md shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800 font-family-primary">
          Register
        </h2>

        {error && (
          <p className="bg-red-100 text-yellow-700 p-2 mb-4 rounded text-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 p-2 mb-4 rounded text-sm">
            {success}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}
