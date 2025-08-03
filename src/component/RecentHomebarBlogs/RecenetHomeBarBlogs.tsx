'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import Link from 'next/link';

type Blog = {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
};

export default function RecentHomeBarBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {blogs.length > 0 && (
        <motion.div
          className="container mx-auto px-4 py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold mb-8 text-bg-secondary tracking-wide font-family-secondary">
            Recent Blogs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs
              .slice(-5)
              .reverse()
              .map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-full h-52 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-font-primary">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <Link href={`/blogs/${blog._id}`}>
                      <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
