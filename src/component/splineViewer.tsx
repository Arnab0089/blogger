'use client';
import Spline from '@splinetool/react-spline';
import { motion } from 'motion/react';

export default function SplineViewer() {
  try {
    return (
      <motion.div className="over ">
        <div className="lg:w-[40%] h-[500px] robot-3d  mx-auto flex justify-center items-center overflow-hidden">
          <div className="hidden md:block">
            <motion.img
              src={'/assest2/platform1.png'}
              alt="Robot"
              width={1000}
              height={1000}
              className="absolute w-[90%] top-20 left-0  h-[300px] object-content opacity-50 z-[-1]"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{ delay: 1.55, duration: 1, ease: 'linear' }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, ease: 'linear', duration: 0.5 }}
            className="w-full h-full rounded-lg overflow-hidden shadow-lg"
          >
            <Spline scene="https://prod.spline.design/nof7kE4Ii4-HyfWY/scene.splinecode" />
          </motion.div>
        </div>
      </motion.div>
    );
  } catch (error) {
    console.error('Spline error:', error);
    return <div>Failed to load 3D scene.</div>;
  }
}
