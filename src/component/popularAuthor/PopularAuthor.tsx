'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface Author {
  name: string;
  email: string;
  profileImage: string;
  blogCount: number;
}

export default function PopularAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    axios
      .get('/api/popular-author')
      .then((res) => setAuthors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Popular Authors</h2>
      <ul className="space-y-4">
        {authors.map((author, index) => (
          <li key={index} className="flex items-center space-x-4">
            <Image
              src={author.profileImage || '/default-avatar.png'}
              alt={author.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{author.name}</p>
              <p className="text-sm text-gray-500">{author.blogCount} Blogs</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
