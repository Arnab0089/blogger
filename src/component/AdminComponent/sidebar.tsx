'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  closeSidebar?: () => void;
}

export default function Sidebar({ closeSidebar }: SidebarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-slate-100 h-full w-full sm:w-72">
      <div className="px-2 sm:pl-14 border-b-2 py-[11px] border-b-font-primary bg-gradient-to-bl from-bg-primary to-bg-secondary">
        <Link href={'/'} onClick={closeSidebar}>
          <Image
            src={'/assest2/logo1.png'}
            alt="logo"
            width={180}
            height={60}
          />
        </Link>
      </div>
      <div className="w-full h-full relative py-12 border-r-2 bg-gradient-to-br from-bg-secondary to-green-500 border-r-font-primary shadow-2xl font-family-primary ">
        <div className="w-full h-full relative">
          <div
            className={`flex flex-col gap-6 ${
              isSticky
                ? 'fixed top-10 mx-8 transition-all duration-500 ease-in-out w-full'
                : 'absolute right-0 w-[70%] sm:w-[80%]'
            }`}
          >
            <Link
              href={'/admin'}
              onClick={closeSidebar}
              className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] rounded-l-2xl"
            >
              <Image
                src={'/assest2/dashboard.png'}
                alt="Add Icon"
                width={24}
                height={24}
              />
              <p className="font-semibold">Dashboard</p>
            </Link>
            <Link
              href={'/admin/addProduct'}
              onClick={closeSidebar}
              className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] rounded-l-2xl"
            >
              <Image
                src={'/assest2/add-document.png'}
                alt="Add Icon"
                width={24}
                height={24}
              />
              <p className="font-semibold">Add Blogs</p>
            </Link>

            <Link
              href={'/admin/bloglist'}
              onClick={closeSidebar}
              className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] rounded-l-2xl"
            >
              <Image
                src={'/assest2/list.png'}
                alt="Blog Icon"
                width={24}
                height={24}
              />
              <p className="font-semibold">Blog List</p>
            </Link>

            <Link
              href={'/admin/subscriptions'}
              onClick={closeSidebar}
              className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] rounded-l-2xl"
            >
              <Image
                src={'/assest2/email.png'}
                alt="Email Icon"
                width={24}
                height={24}
              />
              <p className="font-semibold">Email List</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
