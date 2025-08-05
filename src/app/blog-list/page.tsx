import Bloglist from '@/component/bloglist';
import React from 'react';
import Header from '@/component/Header';
import Footer from '@/component/Footer/footer';
import MobileNavMenu from '@/component/MobileNavMenuHomebar/MobileNavMenu';

export default function page() {
  return (
    <div>
      <Header />
      <div className="relative w-full h-full">
        <div className="hidden md:block ">
          <Bloglist />
        </div>
        <div className="md:hidden">
          <Bloglist />
        </div>
      </div>
      <Footer />
      <MobileNavMenu />
    </div>
  );
}
