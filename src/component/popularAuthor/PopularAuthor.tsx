'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'motion/react';

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
    authors.length > 0 && (
      <motion.div
        className="p-4 bg-bg-secondary shadow-lg rounded-xl font-family-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <h2 className="text-2xl text-black font-semibold mb-4">
          Popular Authors
        </h2>
        <ul className="space-y-4">
          {authors.map((author, index) => (
            <li key={index} className="flex items-center space-x-4">
              <Image
                src={author.profileImage || '/default-avatar.png'}
                alt={author.name}
                width={48}
                height={48}
                className="rounded-2xl object-cover shadow-md border-2 border-bg-light-primary"
              />
              <div>
                <p className="font-medium text-xl font-family-primary">
                  {author.name}
                </p>
                <p className="text-md">{author.blogCount} Blogs</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    )
  );
}
