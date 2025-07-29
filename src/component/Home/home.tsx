'use-client';
import React from 'react';
import Image from 'next/image';
import SplineViewer from '@/component/splineViewer';
import GetStartedButon from '@/component/Home/GetStarted/getstarted';

export default function home() {
  return (
    <div>
      <div className="relative">
        <Image
          src={'/assest2/gradient.png'}
          alt="Gradient"
          width={1000}
          height={1000}
          className="absolute top-0 right-0 opacity-[0.5] z-[-1]"
        />
        <div className="h-0 text-white w-full sm:w-[30rem] absolute top-[20%] right-0 shadow-[0px_0px_7000px_15px] rounded-full z-[-1] rotate[-30deg]"></div>

        <div className="flex flex-col justify-center min-h-[calc(90vh-6rem)] upperContent">
          <div className="max-w-[40rem] ml-[10%] z-99 content  ">
            <Image
              src={'/assest2/background2.jpg'}
              alt="Background"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 bg-cover opacity-[0.19] z-10 rounded-lg shadow-lg hidden md:block"
            />

            <div className="relative z-20">
              <div className="tag-box my-4">
                <div className="tag">
                  <span>Introducing</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4 mx-2 tracking-wide">
                {' '}
                For <br /> Creators
              </h1>
              <p
                className=" mb-6 mx-2 text-2xl max-w-[30rem]  bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   bg-clip-text text-transparent 
                   animate-gradient-x transition-all duration-1000 font-family-primary font-medium"
              >
                Showcase your thoughts and creativity with others,help to build
                and learn together.
              </p>
              <GetStartedButon />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <SplineViewer />
      </div>
    </div>
  );
}
