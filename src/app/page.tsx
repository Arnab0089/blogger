import FeatureSection from '@/component/FeatureSecton/feature';
import Header from '@/component/Header';
import Homebar from '@/component/Home/home';
import RecentBlogs from '@/component/recentBlogs';
import Footer from '@/component/Footer/footer';

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
