'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import UserAvatar from './userAvatar';

export default function AdminHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      <div className="relative z-50" ref={dropdownRef}>
        <div className="flex items-center justify-between w-full py-2 px-6 border-b-2 border-font-primary bg-bg-light-primary shadow-2xl rounded-br-2xl">
          <h3 className="font-semibold text-font-secondary text-xl lg:text-2xl">
            Blogging Panel
          </h3>

          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer rounded-full bg-font-secondary border-2 border-bg-secondary hover:bg-font-primary transition duration-300"
          >
            <UserAvatar />
          </div>
        </div>

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
    </>
  );
}
