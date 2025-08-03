import Header from '@/component/Header';
import HomeTab from '@/component/HomeTab/HomeTab';
import RecentBlogs from '@/component/RecentHomebarBlogs/RecenetHomeBarBlogs';
import Footer from '@/component/Footer/footer';

export default function Home() {
  return (
    <div className="">
      <Header />
      <HomeTab />
      <RecentBlogs />
      <Footer />
    </div>
  );
}
