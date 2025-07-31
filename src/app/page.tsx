import FeatureSection from '@/component/FeatureSecton/feature';
import Header from '@/component/Header';
import Homebar from '@/component/Home/homebar';
import RecentBlogs from '@/component/recentBlogs';
import Footer from '@/component/Footer/footer';
import { motion } from 'motion/react';
import { use } from 'react';

export default function Home() {
  return (
    <div className="">
      <Header />
      <Homebar />
      <FeatureSection />
      <RecentBlogs />
      <Footer />
    </div>
  );
}
