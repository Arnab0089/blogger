'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SplineViewer from '@/component/splineViewer';
import * as motion from 'motion/react-client';
import GetStartedButon from '@/component/Home/GetStarted/getstarted';
import { useAnimation } from 'motion/react';

export default function home() {
  const controls = useAnimation();
  const prevScroll = useRef(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 300) {
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
        x: [1000, 500, 0],
        rotate: [0, 360],
        scale: [0.7, 0.2, 1],
        opacity: [1, 0.5, 0.2],
        transition: { delay: 0.5, duration: 1.7, ease: 'linear' },
      });
    } else {
      controls.start({
        x: [0, 500, 1000],
        rotate: [360, 0],
        scale: [1, 0.2, 0.7],
        opacity: [0.2, 0.5, 1],
        transition: { duration: 1.5, ease: 'linear' },
      });
    }
  }, [direction, controls]);

  return (
    <div>
      <div className="relative overflow-hidden">
        <Image
          src={'/assest2/gradient.png'}
          alt="Gradient"
          width={1000}
          height={1000}
          className="absolute top-0 right-0 opacity-[0.5] z-[-1]"
        />
        <div className="h-0 text-white w-full sm:w-[30rem] absolute top-[20%] right-0 shadow-[0px_0px_7000px_15px] rounded-full z-[-1] rotate[-30deg]"></div>

        <div className="flex flex-col justify-center min-h-[calc(90vh-6rem)] upperContent">
          <div className=" w-full sm:max-w-[40rem] sm:ml-[10%] z-99 content">
            <motion.img
              src={'/assest2/background2.jpg'}
              alt="Background"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 bg-cover opacity-[0.19] z-10 rounded-lg shadow-lg hidden md:block"
              animate={controls}
            />

            <div className="hidden sm:block">
              <motion.div
                className="relative z-20"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5, ease: 'linear' }}
              >
                <motion.div
                  className="tag-box my-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className="tag">
                    <span className="font-family-secondary text-2xl">
                      Introducing
                    </span>
                  </div>
                </motion.div>
                <motion.h1
                  className="text-5xl font-bold mb-4 mx-2 tracking-wide text-font-secondary font-family-secondary"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.5, ease: 'easeInOut' }}
                >
                  {' '}
                  For <br /> Creators
                </motion.h1>
                <motion.p
                  className=" mb-6 mx-2 text-2xl max-w-[30rem]  bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   bg-clip-text text-transparent 
                   animate-gradient-x transition-all duration-1000 font-family-primary font-medium"
                  initial={{ opacity: 0, x: 1000 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5, duration: 0.5, ease: 'easeInOut' }}
                >
                  Showcase your thoughts and creativity with others,help to
                  build and learn together.
                </motion.p>

                <GetStartedButon />
              </motion.div>
            </div>
            <div className="sm:hidden">
              <motion.div
                className="relative z-20"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: 'linear' }}
              >
                <motion.div
                  className="tag-box my-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className="tag">
                    <span>Introducing</span>
                  </div>
                </motion.div>
                <motion.h1
                  className="text-5xl font-bold mb-4 mx-2 tracking-wide text-white"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: 'easeInOut' }}
                >
                  {' '}
                  For <br /> Creators
                </motion.h1>
                <motion.p
                  className=" mb-6 mx-2 p-2 text-xl  max-w-[25rem]  text-font-primary font-family-primary font-medium"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: 'easeInOut' }}
                >
                  Showcase your thoughts and creativity with others,help to
                  build and learn together.
                </motion.p>
                <motion.div
                  className="flex justify-center items-center"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    delay: 1,
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                >
                  <GetStartedButon />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hidden sm:block">
        <SplineViewer />
      </div> */}
    </div>
  );
}
