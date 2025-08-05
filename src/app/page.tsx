import Header from '@/component/Header';
import HomeTab from '@/component/HomeTab/HomeTab';
import RecentBlogs from '@/component/RecentHomebarBlogs/RecenetHomeBarBlogs';
import Footer from '@/component/Footer/footer';
import MobileNavMenu from '@/component/MobileNavMenuHomebar/MobileNavMenu';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <HomeTab />
      <RecentBlogs />
      <div className="">
        <Footer />
      </div>

      <MobileNavMenu />
    </div>
  );
}
