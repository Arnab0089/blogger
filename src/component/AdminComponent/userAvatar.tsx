'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface DecodedToken {
  name: string;
  email: string;
  id: string;
}

export default function UserAvatar({ size = 40 }: { size?: number }) {
  const [avatarSrc, setAvatarSrc] = useState<string>('/assest2/close.png'); // fallback

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const firstLetter = decoded.name?.[0]?.toUpperCase();

      if (firstLetter && /^[A-Z]$/.test(firstLetter)) {
        setAvatarSrc(`/assest2/Alphabet/${firstLetter}.png`);
      } else {
        setAvatarSrc(`/assest2/Alphabet/default.png`);
      }
    } catch (err) {
      console.error('Token decode error:', err);
    }
  }, []);

  return (
    <Image
      src={avatarSrc}
      alt="User Avatar"
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}
