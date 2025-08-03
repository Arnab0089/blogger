'use client';
import React from 'react';
import { motion } from 'motion/react';
import PopularAuthors from '../popularAuthor/PopularAuthor';

export default function HomeTab() {
  return (
    <div className="mt-8  px-4 sm:px-12 ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="col-span-2 ">
          <div className="relative w-full h-[200px] mb-6">
            <motion.video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[200px] object-scale-down sm:object-cover rounded-lg shadow-lg mb-6 opacity-10 "
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <source
                src="/assest2/HomeBanner/homebanner.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </motion.video>
            <div className="w-full h-full absolute bg-bg-light-primary top-0 left-0 opacity-45"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, scale: [1, 1.05, 1] }}
            transition={{ duration: 1, ease: 'linear' }}
          >
            <h2 className="text-2xl font-bold mb-6 font-family-secondary text-font-secondary tracking-wider">
              Welcome to Arnab's Blog
            </h2>
            <p className="text-lg font-family-primary text-gray-700 font-display:swap">
              Discover the latest articles and insights from our community.
            </p>
          </motion.div>
        </div>
        <div className="col-span-1  rounded-lg shadow-lg">
          <PopularAuthors />
        </div>
      </div>
    </div>
  );
}
