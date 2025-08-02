import React from 'react';
import Image from 'next/image';

import arrow from '@/Assets/arrow.png';
import Link from 'next/link';

export default function BlogItem({
  title,
  description,
  image,
  category,
  id,
}: {
  title: string;
  description: string;
  image: string;
  category: string;
  id: string;
}) {
  return (
    <div className="">
      <div className="max-w-[330px] sm:max-w-[300px] h-full bg-white border-2 text-font-secondary  border-font-secondary hover:shadow-[-7px_7px_0px] shadow-lg rounded-b-lg  transition-all duration-300 cursor-pointer">
        <Image
          src={image}
          alt="Blog image"
          layout="responsive"
          width={300}
          height={200}
          className="border-b-2 border-font-secondary rounded-b-lg mb-2"
        />
        <span className="ml-5 px-2 py-1 text-lg font-semibold bg-font-secondary  text-bg-light-primary font-family-secondary tracking-widest rounded-lg ">
          {category}
        </span>
        <div className="p-5">
          <h5 className="mb-2 text-2xl  text-font-primary font-family-secondary tracking-wider text-left font-semibold  ">
            {title}
          </h5>
          <p className="mb-3 text-sm tracking-widest font-semibold text-black font-family-primary">
            {description.split(' ').slice(0, 25).join(' ')}
            {description.split(' ').length > 25 ? '...' : ''}
          </p>
          <Link
            href={`/blogs/${id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 p-2 bg-bg-light-primary rounded-lg font-semibold font-family-secondary"
          >
            Read More{' '}
            <Image
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
              className="inline-block ml-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
