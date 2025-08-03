'use client';

import { Montserrat } from 'next/font/google';
import Sidebar from '@/component/AdminComponent/sidebar';
import AdminHeader from '@/component/AdminComponent/AdminHeader';
import MobileMenu from '@/component/AdminComponent/MobileMenu'; // import here
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div
      className={`relative flex ${montserrat.className} bg-white min-h-screen`}
    >
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full">
        <AdminHeader />
        {children}
      </div>

      {isMenuOpen && <MobileMenu onClose={closeMenu} />}

      <button
        onClick={toggleMenu}
        className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-xl hover:bg-gray-800 transition-all lg:hidden"
      >
        {isMenuOpen ? <IoClose size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  );
}
