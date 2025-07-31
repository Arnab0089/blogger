'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'motion/react';

export default function FeatureComponent() {
  const controls = useAnimation();
  const prevScroll = useRef(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 800) {
        setDirection('down');
      } else {
        setDirection('up');
      }

      prevScroll.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (direction === 'up') {
      controls.start({
        x: [-1000, -500, 0],
        y: [-650, 0],
        rotate: [0, 360],
        scale: [1, 0.2, 1],
        opacity: [1, 0.5, 0.2],
        transition: { delay: 0.5, duration: 1.7, ease: 'linear' },
      });
    } else {
      controls.start({
        x: [0, -500, -1000],
        y: [0, -650],
        rotate: [360, 0],
        scale: [1, 0.2, 1],
        opacity: [0.2, 0.5, 0.8],
        transition: { duration: 1.5, ease: 'linear' },
      });
    }
  }, [direction, controls]);

  return (
    <motion.div
      className="text-center p-10 relative"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
    >
      <Image
        src={'/assest2/gradient.png'}
        alt="Gradient"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 opacity-[0.5] z-[-1]"
      />
      <motion.div className="max-w-2xl mx-auto mt-10 relative">
        <div className="h-0 text-white w-full sm:w-[30rem] absolute top-[20%] left-0 shadow-[0px_0px_7000px_15px] rounded-full z-[-1] rotate[-30deg]"></div>
      </motion.div>
      <motion.div
        className="absolute w-[50%] top-0 right-0 h-[500px] hidden md:block "
        animate={controls}
      >
        <Image
          src={'/assest2/background3.jpg'}
          alt="Feature"
          width={1000}
          height={1000}
          className="absolute top-0 right-0 w-full h-full object-cover   z-[-1] rounded-2xl shadow-lg"
        />
      </motion.div>
      <div className="relative z-10">
        <div className=" max-w-2xl mx-auto mt-10 relative">
          <div className="w-full sm:w-[50%] h-[50px] bg-bg-light-primary top-[-5px] absolute z-[-1] rounded-l-2xl"></div>
          <h2
            className="text-4xl font-extrabold 
                   bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   bg-clip-text text-transparent 
                   animate-gradient-x transition-all duration-1000"
          >
            Discover Our Smart AI Feature
          </h2>
        </div>
        <p className="text-font-primary mt-4 text-lg max-w-xl mx-auto">
          Experience a cutting-edge AI tool with seamless integration and
          stunning performance.
        </p>
      </div>
    </motion.div>
  );
}
