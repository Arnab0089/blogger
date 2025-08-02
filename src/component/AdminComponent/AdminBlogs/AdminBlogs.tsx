'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface AdminBlogsProps {
  currentBlogId: string;
  authorId: string;
  author: string;
}

interface Blog {
  _id: string;
  title: string;
  author: string;
  image?: string;
}

// Utility function to shuffle and slice blogs
const getRandomBlogs = (blogs: Blog[], count: number) => {
  return [...blogs].sort(() => Math.random() - 0.5).slice(0, count);
};

const AdminBlogs: React.FC<AdminBlogsProps> = ({
  currentBlogId,
  authorId,
  author,
}) => {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blog', {
          params: { userData: authorId },
        });
        if (res.data.success) {
          const filtered = res.data.blogs.filter(
            (blog: Blog) => String(blog._id) !== String(currentBlogId),
          );
          const randomTen = getRandomBlogs(filtered, 10);
          setRelatedBlogs(randomTen);
          console.log('Random related blogs:', randomTen);
        }
      } catch (err) {
        console.error('Error fetching related blogs:', err);
      }
    };

    if (authorId) fetchBlogs();
  }, [authorId, currentBlogId]);

  if (relatedBlogs.length === 0) {
    return (
      <div className="text-center text-2xl font-family-secondary capitalize text-bg-secondary my-8">
        Others blogs by {author} will be available soon.
      </div>
    );
  } else {
    return (
      <>
        <div className="w-full px-6 md:px-20 my-10">
          <h2 className="text-2xl font-bold mb-6 font-family-secondary text-bg-secondary tracking-wider">
            More by {author}
          </h2>

          <Swiper
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="w-full max-w-4xl pb-12 relative"
          >
            {relatedBlogs.map((blog) => (
              <SwiperSlide
                key={blog._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition max-w-sm min-h-[350px] max-h-[350px] flex flex-col items-center justify-between"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold font-family-primary mb-2">
                  {blog.title}
                </h3>
                <a
                  href={`/blogs/${blog._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read more →
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    );
  }
};

export default AdminBlogs;
