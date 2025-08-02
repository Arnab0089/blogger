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
    <footer className="bg-font-secondary text-bg-light-primary px-4 py-8 text-sm w-full">
      <div className="flex justify-center items-center gap-6 mb-6 border-t border-b border-gray-600 py-4">
        <Link
          href={'https://www.facebook.com/arnab.kundu.77398'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="text-xl cursor-pointer hover:text-blue-500 transition" />
        </Link>
        <Link
          href={'https://www.instagram.com/arnab98064/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-xl cursor-pointer hover:text-pink-400 transition" />
        </Link>
        <Link
          href={'https://www.youtube.com/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="text-xl cursor-pointer hover:text-red-600 transition" />
        </Link>
        <Link
          href={'https://x.com/Arnab11576652'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter className="text-xl cursor-pointer hover:text-blue-400 transition" />
        </Link>
        <Link
          href={'https://www.linkedin.com/in/arnab-kundu-763a471b0/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="text-xl cursor-pointer hover:text-blue-700 transition" />
        </Link>
      </div>

      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">BlogBrand</h1>
        <p className="text-bg-light-primary mt-1">
          Copyright © {new Date().getFullYear()} BlogBrand, Inc.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-gray-300 text-sm">
        <a href="#" className="hover:underline font-semibold">
          Legal Stuff
        </a>
        <span className="hidden sm:inline">|</span>
        <a href="#" className="hover:underline font-semibold">
          Privacy Policy
        </a>
        <span className="hidden sm:inline">|</span>
        <a href="#" className="hover:underline font-semibold">
          Security
        </a>
        <span className="hidden sm:inline">|</span>
        <a href="#" className="hover:underline font-semibold">
          Website Accessibility
        </a>
        <span className="hidden sm:inline">|</span>
        <a href="#" className="hover:underline font-semibold">
          Manage Cookies
        </a>
      </div>
    </footer>
  );
}
