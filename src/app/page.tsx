import Header from '@/component/Header';
import HomeTab from '@/component/HomeTab/HomeTab';
import RecentBlogs from '@/component/recentBlogs';
import { motion } from 'motion/react';
import { use } from 'react';

export default function Home() {
  return (
    <div className="">
      <Header />
      <HomeTab />
      {/* <RecentBlogs /> */}
    </div>
  );
}
