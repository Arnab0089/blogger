import React from 'react';
import Homebar from '@/component/Home/homebar';
import RecentBlogs from '@/component/recentBlogs';
import FeatureSection from '@/component/FeatureSecton/feature';
import Footer from '@/component/Footer/footer';

export default function page() {
  return (
    <div>
      <Homebar />
      <FeatureSection />
      <RecentBlogs />
      <Footer />
    </div>
  );
}
