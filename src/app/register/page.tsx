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
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: formData,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="absolute z-10 top-5 left-[30%] sm:top-20 sm:left-20">
        <Link href="/">
          <Image src="/assest2/logo1.png" alt="Logo" width={180} height={60} />
        </Link>
      </div>

      <img
        src="/assest2/login.jpg"
        alt="Login"
        className="absolute inset-0 object-cover opacity-90 w-full h-full"
      />

      <form
        onSubmit={handleRegister}
        className="relative z-20 bg-white p-8 rounded mx-6 w-full max-w-md shadow-2xl bg-gradient-to-b from-rose-500 to-blue-300 backdrop-blur-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
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
          className="w-full mb-4 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Optional Profile Image Upload */}
        <label htmlFor="profileImage" className="block mb-2 font-semibold">
          Profile Image (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          id="profileImage"
          className="mb-4 w-full p-2 border rounded"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setProfileImageFile(e.target.files[0]);
            }
          }}
        />

        {profileImageFile && (
          <div className="flex items-center justify-between mb-4">
            <Image
              src={URL.createObjectURL(profileImageFile)}
              alt="Preview"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <button
              type="button"
              onClick={() => setProfileImageFile(null)}
              className="text-sm px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Remove
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
