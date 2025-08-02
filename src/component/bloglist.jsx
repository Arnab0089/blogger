'use client';
import React, { useEffect, useState } from 'react';
import BlogItem from './blogitem';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import BlogNotFound from '@/component/Home/BlogCategoryNotFound/blogNotFound';
import LoadingSpinner from './Utitlity/LoadingSpinner';

export default function Bloglist() {
  const [menu, setMenu] = useState('All');
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [showCategoryBox, setShowCategoryBox] = useState(false);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([
    'All',
    'Lifestyle',
    'Business',
  ]);

  const blogsPerPage = 5;

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.status !== 200) throw new Error('Failed to fetch blogs');
      setLoading(false);

      const data = await response.json();
      setBlogs(data.blogs);

      const dynamicCategories = Array.from(
        new Set(data.blogs.map((b) => b.category)),
      );
      const defaultCategories = ['Lifestyle', 'Business'];
      const mergedCategories = Array.from(
        new Set(['All', ...defaultCategories, ...dynamicCategories]),
      );

      setCategories(mergedCategories);
      setAuthors(Array.from(new Set(data.blogs.map((b) => b.author))));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [menu, searchQuery]);

  // Filter by category
  const categoryFiltered =
    menu === 'All' ? blogs : blogs.filter((blog) => blog.category === menu);

  // Further filter by search
  const filteredBlogs = categoryFiltered.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleCategoryBox = () => {
    setShowCategoryBox((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setMenu(category);
    setShowCategoryBox(false); // hide the box after selection
  };

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const visibleBlogs = filteredBlogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage,
  );

  const generatePageNumbers = () => {
    const pages = [];
    const visibleCount = 5;

    if (totalPages <= visibleCount + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, page - 2);
      let end = Math.min(totalPages - 1, page + 2);

      if (page <= 3) end = 6;
      if (page >= totalPages - 2) start = totalPages - 5;

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div>
      {/* Category Buttons
      <div className="flex justify-center gap-4 flex-wrap my-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={`py-1 px-4 rounded-sm transition-all duration-300 ${
              menu === category
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div> */}

      {/* Custom Dropdown Button */}
      <div className="relative flex justify-center py-8">
        {/* Blur Overlay */}
        {showCategoryBox && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
            onClick={() => setShowCategoryBox(false)}
          />
        )}

        {/* Category Button */}
        <button
          onClick={toggleCategoryBox}
          className="px-4 py-2 bg-bg-secondary text-black font-extrabold font-family-secondary rounded shadow hover:bg-font-secondary hover:text-bg-light-primary transition relative z-20"
        >
          {menu === 'All' ? 'All Categories' : menu}
        </button>

        {/* Dropdown Box */}
        {showCategoryBox && (
          <div className="absolute top-full mt-2 w-full sm:w-[75%] bg-white border border-gray-300 shadow-md z-20 flex p-4 justify-center items-center flex-wrap rounded-2xl">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="px-4 py-2 hover:bg-bg-secondary hover:text-bg-light-primary cursor-pointer transition bg-bg-light-primary font-family-secondary text-font-primary rounded-sm m-2 font-semibold"
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[80%] sm:w-[60%] md:w-[40%] px-4 py-2 border border-gray-300 bg-bg-secondary font-family-secondary rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Blog List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-wrap justify-center sm:justify-start gap-12 mx-4 sm:mx-10 lg:mx-24 my-12 group">
          {visibleBlogs.length > 0 ? (
            visibleBlogs.map((blog, index) => {
              const tiltClass =
                index % 2 === 0
                  ? 'rotate-[-2deg] group-hover:rotate-[0deg] group-hover:scale-105'
                  : 'rotate-[2deg] group-hover:rotate-[0deg] group-hover:scale-105';

              return (
                <div
                  key={blog._id}
                  className={`transition-transform duration-300 ${tiltClass} group-hover:wave-animate`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BlogItem
                    id={blog._id}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    category={blog.category}
                  />
                </div>
              );
            })
          ) : (
            <div className="w-full text-center text-gray-500">
              <BlogNotFound />
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredBlogs.length > 0 && (
        <div className="flex gap-4 justify-center my-8 w-full h-[50px]">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            hidden={page === 1}
            className="py-1 px-4 rounded-sm transition-all duration-300 bg-gray-200 text-black hover:bg-gray-300 hidden:opacity-50 disabled:cursor-not-allowed"
          >
            <GrLinkPrevious />
          </button>

          {generatePageNumbers().map((p, index) => (
            <button
              key={index}
              onClick={() => typeof p === 'number' && setPage(p)}
              disabled={p === '...'}
              className={`py-1 px-4 rounded-sm transition-all duration-300 text-sm font-bold font-family-secondary ${
                page === p
                  ? 'bg-font-secondary text-bg-light-primary shadow-md'
                  : typeof p === 'number'
                  ? 'bg-bg-primary text-black hover:bg-gray-300'
                  : 'bg-transparent text-black cursor-default'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            hidden={page === totalPages}
            className="py-1 px-4 rounded-sm transition-all duration-300 bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GrLinkNext />
          </button>
        </div>
      )}
    </div>
  );
}
