'use client';

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import arrow from '@/Assets/arrow.png';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import DOMPurify from 'isomorphic-dompurify';
import Footer from '@/component/Footer/footer';
import AdminBlogs from '@/component/AdminComponent/AdminBlogs/AdminBlogs';
import GetStarted from '@/component/Home/GetStarted/getstarted';

export default function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  interface BlogData {
    _id?: string;
    title?: string;
    author?: string;
    blogContent?: string;
    authorImage?: string;
    image?: string;
    description?: string;
  }

  const [data, setData] = useState<BlogData>({});
  const [cleanedHTML, setCleanedHTML] = useState('');

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const linkHref = token ? '/admin' : '/login';

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/blog/', {
        params: { id },
      });
      if (response.data.success) {
        setData(response.data.blog);
        console.log(
          'Blog data fetched successfully:',
          response.data.blog.blogContent,
        );
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data?.blogContent) {
      const sanitized = DOMPurify.sanitize(data.blogContent);
      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitized, 'text/html');

      doc.querySelectorAll('div.ql-code-block').forEach((el) => {
        if (el.textContent?.trim() === 'CopyEdit') {
          el.remove();
        }
      });

      setCleanedHTML(doc.body.innerHTML);
    }
  }, [data?.blogContent]);

  return (
    <>
      {/* Header Section */}
      <div className="banner  px-5 md:px-12 lg:px-28 pt-6 pb-24 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link href="/">
            <div className="tag-banner-box">
              <div className="tag-banner ">
                <Image
                  src="/assest2/logo1.png"
                  alt="Logo"
                  width={180}
                  height={60}
                  className="hover:opacity-80 transition duration-300"
                />
              </div>
            </div>
          </Link>
          <button className="flex items-center gap-2 border text-fuchsia-500 border-gray-300 rounded-lg px-5 py-2 bg-white  hover:bg-gray-100 hover:text-font-primary transition duration-300 cursor-pointer shadow-[-7px_7px_0px] font-family-primary font-semibold">
            <Link href={linkHref}>Create your Own</Link>
            <Image src={arrow} alt="arrow" width={18} height={18} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <div>
            <h1
              className="text-xl sm:text-4xl font-bold leading-snug   bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   bg-clip-text text-transparent 
                   animate-gradient-x transition-all duration-1000 font-family-primary py-3 mx-auto "
            >
              {data?.title}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Main Blog Content */}
      <div className="flex flex-col justify-center items-center ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-5 md:mx-auto w-[90%] md:max-w-4xl -mt-12 mb-16 bg-white p-6 md:p-10 rounded-xl  z-10 relative "
          style={{ boxShadow: '7px 7px 2px rgba(225, 42, 251, 0.9)' }}
        >
          {data?.image && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="overflow-hidden rounded-lg mb-8 tag-image-box p-1"
            >
              <img src={data.image} alt="Blog" className="object-cover" />
            </motion.div>
          )}

          <h2 className="text-2xl  text-gray-800 mb-4 font-family-primary font-bold">
            Introduction:
          </h2>
          <p className="text-gray-700 text-lg px-4 text-justify leading-relaxed mb-6 hover:text-font-primary transition-colors duration-300">
            {data?.description}
          </p>

          {/* Sample Steps with fade-in animation */}
          <h2 className="text-2xl  text-gray-800 mb-4 font-family-primary font-bold">
            Content:
          </h2>
          <div
            className="prose dark:prose-invert text-gray-700 leading-relaxed prose-a:text-blue-600 prose-a:underline prose-img:rounded-lg prose-h2:font-bold prose-ul:pl-5 prose-h2:font-family-primary prose-headings w-full"
            dangerouslySetInnerHTML={{ __html: cleanedHTML }}
          ></div>
        </motion.div>
        <div className="w-full  container mx-auto max-w-5xl flex justify-center sm:justify-end items-center gap-4 p-6 rounded-lg shadow-lg relative z-20">
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
            className="mt-3 text-lg sm:text-2xl text-[#FFE8B6] font-semibold font-family-primary flex items-center justify-center gap-2 "
          >
            <span className="text-lg font-serif">Created by:</span>
            {data?.author}
          </motion.p>
        </div>
      </div>
      <AdminBlogs currentBlogId={data?._id ?? ''} author={data?.author ?? ''} />
      <Footer />
    </>
  );
}
