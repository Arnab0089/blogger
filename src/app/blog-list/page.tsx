import Bloglist from '@/component/bloglist';
import React from 'react';
import Header from '@/component/Header';
import Footer from '@/component/Footer/footer';

export default function page() {
  return (
    <div>
      <Header />
      <div className="relative w-full h-full">
        <img
          src="/assest2/typewritter.jpg"
          alt="Typewriter"
          className="w-[50%] h-full object-content absolute top-0 right-0 z-[-1] opacity-30 rounded-r-2xl"
        />
        <img
          src="/assest2/readmore.jpg"
          alt="Read More"
          className="w-[50%] h-full object-content absolute top-0 left-0 z-[-1] opacity-30 rounded-l-2xl"
        />
        <Bloglist />
      </div>

      <Footer />
    </div>
  );
}
