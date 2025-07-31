'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import addIcon from '@/Assets/add_icon.png';
import blogIcon from '@/Assets/blog_icon.png';
import emailIcon from '@/Assets/email_icon.png';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="fixed bottom-20 right-6 z-50 w-60 bg-white rounded-xl shadow-2xl border border-gray-300 p-4 flex flex-col gap-4 lg:hidden">
      <Link
        href="/admin/addProduct"
        onClick={onClose}
        className="flex items-center gap-3 text-sm font-medium hover:text-blue-600"
      >
        <Image src={addIcon} alt="Add" width={20} height={20} />
        Add Blogs
      </Link>
      <Link
        href="/admin/bloglist"
        onClick={onClose}
        className="flex items-center gap-3 text-sm font-medium hover:text-blue-600"
      >
        <Image src={blogIcon} alt="Blogs" width={20} height={20} />
        Blog List
      </Link>
      <Link
        href="/admin/subscriptions"
        onClick={onClose}
        className="flex items-center gap-3 text-sm font-medium hover:text-blue-600"
      >
        <Image src={emailIcon} alt="Emails" width={20} height={20} />
        Email List
      </Link>
    </div>
  );
}
