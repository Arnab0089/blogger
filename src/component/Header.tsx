import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function Header() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  const linkHref = token ? '/admin' : '/login';

  return (
    <div className="flex justify-between px-4 py-2 bg-bg-light-primary shadow-2xs  w-full">
      <div className="flex items-center space-x-4">
        <Link href={'/'}>
          <Image
            src={'/assest2/logo/logo5.png'}
            alt="Logo"
            width={240}
            height={40}
          />
        </Link>
      </div>
      <div className=" items-center space-x-4 hidden md:flex">
        <Link href={'/blog-list'}>
          <button className="flex gap-2 font-family-primary border-2 border-gray-300 rounded-lg px-4 py-2 bg-bg-light-primary text-font-secondary hover:bg-gray-100 transition duration-300 shadow-[-7px_7px_0px] cursor-pointer w-full font-extrabold ">
            <p className="font-extrabold text-black">Blogs</p>
            <Image
              src={'/assest2/blog.png'}
              alt="Blog"
              width={20}
              height={20}
            />
          </button>
        </Link>
        <Link href={'/about'}>
          <button className="flex gap-2 font-family-primary border-2 border-gray-300 rounded-lg px-4 py-2 bg-bg-light-primary text-font-secondary hover:bg-gray-100 transition duration-300 shadow-[-7px_7px_0px] cursor-pointer font-extrabold">
            <p className="text-black font-extrabold">About</p>
            <Image
              src={'/assest2/about.png'}
              alt="About"
              width={20}
              height={20}
            />
          </button>
        </Link>
        <Link href={'/contact'}>
          <button className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-bg-light-primary text-font-secondary hover:bg-gray-100 transition duration-300 shadow-[-7px_7px_0px] cursor-pointer font-extrabold font-family-primary">
            <p className="text-black font-extrabold">Contact</p>
          </button>
        </Link>
      </div>
      <Link href={linkHref} className="flex items-center p-2">
        <button className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-bg-light-primary text-font-secondary hover:bg-gray-100 transition duration-300 shadow-[-7px_7px_0px] cursor-pointer font-family-primary">
          <p className="text-black font-extrabold">
            {token ? 'Dashboard' : 'Login'}
          </p>
        </button>
      </Link>
    </div>
  );
}
