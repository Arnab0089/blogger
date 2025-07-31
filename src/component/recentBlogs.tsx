'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BlogItem from '@/component/blogitem';
import LoadingSpinner from './Utitlity/LoadingSpinner';
import { motion } from 'motion/react';

type Blog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
  author: string;
  authorImage: string;
};

export default function recentBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      if (response.status === 200) {
        setBlogs(response.data.blogs);
        console.log('Blogs fetched successfully:', response.data.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  console.log(
    'Authors images:',
    blogs.map((blog) => blog.authorImage),
  );

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <motion.div
      className="container  sm:mx-auto sm:p-4 m-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row  items-center justify-between mb-4">
        <div className="w-full h-full">
          <h1
            className="text-4xl font-extrabold 
                   bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   bg-clip-text text-transparent 
                   animate-gradient-x transition-all duration-1000  pb-4"
          >
            Recent Blogs
          </h1>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-wrap justify-center gap-12 mt-6">
              {blogs.slice(-3).map((blog, index) => {
                const tiltClass =
                  index % 2 === 0
                    ? 'rotate-[-2deg] hover:scale-105 hover:rotate-[0deg]'
                    : 'rotate-[2deg] hover:scale-105 hover:rotate-[0deg]';

                return (
                  <motion.div
                    key={blog._id}
                    className={`${tiltClass} transition-transform duration-300`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BlogItem
                      id={blog._id}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      category={blog.category}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
        <div className=" w-full lg:w-[30%] h-full lg:h-[500px] p-4 rounded-lg  ">
          <h1
            className="text-2xl font-extrabold 
                   bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   bg-clip-text text-transparent 
                   animate-gradient-x transition-all duration-1000"
          >
            Recent Authors
          </h1>
          <div className="flex flex-wrap justify-center gap-12 mt-6">
            {[...new Map(blogs.map((blog) => [blog.author, blog])).values()]
              .slice(0, 5)
              .map((blog) => (
                <div key={blog.author} className="flex items-center">
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <span className="text-xl font-semibold text-white font-family-primary">
                    {blog.author}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
