'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import addIcon from '@/Assets/add_icon.png';
import blogIcon from '@/Assets/blog_icon.png';
import emailIcon from '@/Assets/email_icon.png';
import Link from 'next/link';

interface SidebarProps {
  closeSidebar?: () => void;
}

export default function Sidebar({ closeSidebar }: SidebarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="flex flex-col bg-slate-100 h-full">
      <div className="px-2 sm:pl-14 border-b-2 py-[11px] border-b-font-primary bg-gradient-to-bl from-bg-primary to-bg-secondary ">
        <Link href={'/'} onClick={closeSidebar}>
          <Image
            src={'/assest2/logo1.png'}
            alt="logo"
            width={180}
            height={60}
          />
        </Link>
      </div>
      <div className="w-full sm:w-80 h-full relative py-12 border-r-2 bg-gradient-to-br from-bg-secondary to-green-500 border-r-font-primary shadow-2xl">
        <div
          className={`w-[70%] sm:w-[80%]  flex flex-col gap-6  ${
            isSticky
              ? 'fixed top-10 mx-8 transition-all duration-500 ease-in-out'
              : 'absolute right-0'
          }`}
        >
          <div className="relative">
            <Link
              href={'/admin/addProduct'}
              onClick={closeSidebar}
              className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px]  rounded-l-2xl"
            >
              <Image src={addIcon} alt="Add Icon" width={24} height={24} />
              <p>Add Blogs</p>
            </Link>
          </div>
          <Link
            href={'/admin/bloglist'}
            onClick={closeSidebar}
            className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] rounded-l-2xl"
          >
            <Image src={blogIcon} alt="Blog Icon" width={24} height={24} />
            <p>Blog List</p>
          </Link>
          <Link
            href={'/admin/subscriptions'}
            onClick={closeSidebar}
            className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] rounded-l-2xl"
          >
            <Image src={emailIcon} alt="Email Icon" width={24} height={24} />
            <p>Email List</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
