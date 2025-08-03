'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { FaFeatherAlt } from 'react-icons/fa';
import { FcAbout } from 'react-icons/fc';

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 bg-bg-light-primary border shadow-lg rounded-xl p-4 w-40  flex flex-col gap-3 transition-all duration-300 lg:hidden justify-center items-center font-family-secondary text-lg">
          <Link href="/blogs" onClick={closeMenu} className="hover:underline">
            <p className="bg-bg-primary text-font-primary px-4 py-2 rounded-2xl flex items-center gap-2">
              Blogs
              <FaFeatherAlt className="text-black" />
            </p>
          </Link>
          <Link href="/about" onClick={closeMenu} className="hover:underline">
            <p className="bg-bg-primary text-font-primary px-4 py-2 rounded-2xl flex items-center gap-2">
              About
              <FcAbout className="text-black text-2xl" />
            </p>
          </Link>
          <Link href="/contact" onClick={closeMenu} className="hover:underline">
            <p className="bg-bg-primary text-font-primary px-4 py-2 rounded-2xl">
              Contact
            </p>
          </Link>
        </div>
      )}

      <button
        onClick={toggleMenu}
        className="fixed bottom-6 right-6 z-50 bg-font-secondary border-2 border-bg-light-primary text-black p-4 rounded-full shadow-xl hover:bg-gray-800 transition-all lg:hidden"
      >
        {isOpen ? <IoClose size={20} /> : <FaBars size={20} />}
      </button>
    </>
  );
}
