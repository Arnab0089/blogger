'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function GetStarted() {
  const [linkHref, setLinkHref] = useState('/login');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLinkHref('/admin');
    }
  }, []);

  return (
    <div>
      <Link href={linkHref}>
        <button className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-white text-black hover:bg-gray-100 transition duration-300 shadow-[-7px_7px_0px] cursor-pointer">
          Get Started
        </button>
      </Link>
    </div>
  );
}
