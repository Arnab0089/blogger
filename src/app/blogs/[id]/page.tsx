'use client';

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import arrow from '@/Assets/arrow.png';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import DOMPurify from 'isomorphic-dompurify';

export default function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  interface BlogData {
    title?: string;
    author?: string;
    blogContent?: string;
    authorImage?: string;
    image?: string;
    description?: string;
  }

  const [data, setData] = useState<BlogData>({});

  const cleanHTML = (html: string) => {
    return DOMPurify.sanitize(html);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/blog/', {
        params: { id },
      });
      if (response.data.success) {
        setData(response.data.blog);
        console.log('Blog data fetched successfully:', response.data.blog);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 px-5 md:px-12 lg:px-28 pt-6 pb-24 shadow-sm">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/assest2/logo1.png"
              alt="Logo"
              width={180}
              height={60}
              className="hover:opacity-80 transition duration-300"
            />
          </Link>
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-5 py-2 bg-white text-black hover:bg-gray-100 hover:shadow-lg transition duration-300">
            Get Started
            <Image src={arrow} alt="arrow" width={18} height={18} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <h1 className="text-3xl sm:text-5xl font-bold leading-snug max-w-3xl mx-auto text-gray-800">
            {data?.title}
          </h1>

          {data?.authorImage && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <Image
                src={data.authorImage}
                alt="Author"
                width={100}
                height={100}
                className="rounded-full mt-6 border-4 border-white shadow-md"
              />
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-lg text-gray-600"
          >
            {data?.author}
          </motion.p>
        </motion.div>
      </div>

      {/* Main Blog Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-5 md:mx-auto max-w-4xl -mt-24 mb-16 bg-white p-6 md:p-10 rounded-xl shadow-xl z-10 relative"
      >
        {data?.image && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="overflow-hidden rounded-lg mb-8"
          >
            <Image
              src={data.image}
              alt="Blog"
              width={1200}
              height={628}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        )}

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Introduction:
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          {data?.description}
        </p>

        {/* Sample Steps with fade-in animation */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Blog Content:
        </h2>
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert text-gray-700 leading-relaxed prose-a:text-blue-600 prose-a:underline prose-img:rounded-lg prose-h2:font-bold prose-ul:pl-5"
          dangerouslySetInnerHTML={{
            __html: data?.blogContent ?? '',
          }}
        ></div>
      </motion.div>
    </>
  );
}
