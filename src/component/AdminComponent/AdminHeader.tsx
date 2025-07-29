'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import UserAvatar from './userAvatar';
import Sidebar from './sidebar';

export default function AdminHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      {/* Header */}
      <div className="relative z-50" ref={dropdownRef}>
        <div className="flex items-center justify-between w-full py-2 px-6 border-b-2 border-font-primary bg-gradient-to-br from-bg-primary to-bg-secondary shadow-2xl rounded-br-2xl">
          {/* Hamburger menu */}
          <button
            className="lg:hidden text-font-secondary text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h3 className="font-semibold text-font-secondary text-xl lg:text-2xl">
            Blogging Panel
          </h3>

          {/* Avatar Dropdown */}
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer rounded-full bg-font-secondary p-2 hover:bg-font-primary transition duration-300"
          >
            <UserAvatar />
          </div>
        </div>

        {/* Logout Dropdown */}
        {dropdownOpen && (
          <div className="absolute top-[100%] right-6 mt-2 bg-white shadow-lg rounded-lg border z-50">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
