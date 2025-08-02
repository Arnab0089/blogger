import React from 'react';
import axios from 'axios';
import RecentBlogPage from '@/component/AdminComponent/BlogPage/RecentBlogPage';
import Footer from '@/component/Footer/footer';

export default async function BlogPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  console.log('Blog ID from params:', id);

  return (
    <>
      <RecentBlogPage blogId={id} />

      <Footer />
    </>
  );
}
