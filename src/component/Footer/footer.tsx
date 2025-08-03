'use client';
import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';
import Link from 'next/link';

export default function footer() {
  return (
    <footer className="bg-font-secondary text-bg-light-primary px-4 py-8 text-sm w-full ">
      <div className="flex justify-center items-center gap-6 mb-6 border-t border-b border-gray-600 py-4 text-xl">
        <Link
          href={'https://www.facebook.com/arnab.kundu.77398'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="text-2xl cursor-pointer hover:text-blue-500 transition" />
        </Link>
        <Link
          href={'https://www.instagram.com/arnab98064/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-2xl cursor-pointer hover:text-pink-400 transition" />
        </Link>
        <Link
          href={'https://www.youtube.com/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="text-2xl cursor-pointer hover:text-red-600 transition" />
        </Link>
        <Link
          href={'https://x.com/Arnab11576652'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter className="text-2xl cursor-pointer hover:text-blue-400 transition" />
        </Link>
        <Link
          href={'https://www.linkedin.com/in/arnab-kundu-763a471b0/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="text-2xl cursor-pointer hover:text-blue-700 transition" />
        </Link>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-bg-light-primary">
          Arnab's Blog
        </h2>
        <p className="text-bg-light-primary mt-1">
          Copyright © {new Date().getFullYear()} BlogBrand, Inc.
        </p>
      </div>
    </footer>
  );
}
