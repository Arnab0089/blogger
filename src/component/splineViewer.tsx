'use client';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';

export default function SplineViewer() {
  try {
    return (
      <div className="over ">
        <div className="lg:w-[40%] h-[500px] robot-3d  mx-auto flex justify-center items-center overflow-x-hidden">
          <div className="hidden md:block">
            <Image
              src={'/assest2/platform1.png'}
              alt="Robot"
              width={1000}
              height={1000}
              className="absolute top-20 left-0 w-full h-[300px] object-content opacity-50 z-[-1]"
            />
          </div>
          <Spline scene="https://prod.spline.design/nof7kE4Ii4-HyfWY/scene.splinecode" />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Spline error:', error);
    return <div>Failed to load 3D scene.</div>;
  }
}
