import React from 'react';
import Homebar from '@/component/Home/homebar';
import RecentBlogs from '@/component/recentBlogs';
import FeatureSection from '@/component/FeatureSecton/feature';
import Footer from '@/component/Footer/footer';
import Header from '@/component/Header';

export default function page() {
  return (
    <div className="relative ">
      <Header />
      <Homebar />
      <FeatureSection />
    </div>
  );
}
