'use client';
import axios from 'axios';
import React, { useState } from 'react';

export default function list({ author }: { author: string }) {
  console.log('Author:', author);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: { author },
      });

      if (response.status === 200) {
        console.log('Blogs fetched successfully:', response.data.blogs);
        setBlogs(response.data.blogs);
      } else {
        console.error('Failed to fetch blogs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  React.useEffect(() => {
    fetchBlogs();
  }, []);
  return <div></div>;
}
