import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function getstarted() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  const linkHref = token ? '/admin' : '/login';
  return (
    <div>
      <Link href={linkHref}>
        <button className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-white text-black hover:bg-gray-100 transition duration-300 shadow-[-7px_7px_0px] cursor-pointer ">
          Get Started
        </button>
      </Link>
    </div>
  );
}
