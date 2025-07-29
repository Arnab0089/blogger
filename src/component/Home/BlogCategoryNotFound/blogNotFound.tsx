'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function BlogNotFound() {
  const [linkHref, setLinkHref] = useState('/login'); // Default

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      setLinkHref('/admin/addProduct');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-7">
      <Image
        src="/assest2/blog-not -found.png"
        alt="Blog Not found"
        width={500}
        height={500}
      />

      <h1
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   bg-clip-text text-transparent 
                   animate-gradient-x transition-all duration-1000 text-2xl"
      >
        Blog Not Found
      </h1>

      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold font-family-primary text-font-primary">
          Create Some Interesting Blogs
        </p>
        <Link href={linkHref}>
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md">
            Go to Blog zone
          </button>
        </Link>
      </div>
    </div>
  );
}
