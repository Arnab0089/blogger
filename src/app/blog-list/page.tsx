import Bloglist from '@/component/bloglist';
import React from 'react';
import Header from '@/component/Header';
import Footer from '@/component/Footer/footer';

export default function page() {
  return (
    <div>
      <Header />
      <div className="relative w-full h-full">
        <div className="hidden md:block">
          <img
            src="/assest2/background4.jpg"
            alt="Typewriter"
            className="w-full h-full object-content absolute top-0 right-0 z-[-1] opacity-30 rounded-r-2xl"
          />

          <Bloglist />
        </div>
        <div className="md:hidden">
          <img
            src="/assest2/background4.jpg"
            alt="Typewriter"
            className="w-full h-full object-content absolute top-0 right-0 z-[-1] opacity-30 rounded-r-2xl"
          />
          <Bloglist />
        </div>
        <div className="md:hidden"></div>
      </div>
      <Footer />
    </div>
  );
}
