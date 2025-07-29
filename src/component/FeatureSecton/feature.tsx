'use client';
import React from 'react';
import Image from 'next/image';

export default function FeatureComponent() {
  return (
    <div className="text-center p-10 relative">
      <Image
        src={'/assest2/gradient.png'}
        alt="Gradient"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 opacity-[0.5] z-[-1]"
      />
      <div className="h-0 text-white w-full sm:w-[30rem] absolute top-[20%] left-0 shadow-[0px_0px_7000px_15px] rounded-full z-[-1] rotate[-30deg]"></div>
      <div className="absolute w-[50%] top-0 right-0 h-[500px] hidden md:block ">
        <Image
          src={'/assest2/background3.jpg'}
          alt="Feature"
          width={1000}
          height={1000}
          className="absolute top-0 right-0 w-full h-full object-cover opacity-[0.2]  z-[-1] rounded-2xl shadow-lg"
        />
      </div>
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
    </div>
  );
}
