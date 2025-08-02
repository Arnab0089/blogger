'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface UserData {
  name: string;
  email: string;
  id: string;
  profileImage?: string | null;
}

export default function UserAvatar({ size = 40 }: { size?: number }) {
  const [avatarSrc, setAvatarSrc] = useState<string>('/assest2/close.png'); // fallback

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user');
        if (!res.ok) throw new Error('Unauthorized or error fetching user');
        const data: UserData = await res.json();

        // Try using profile image
        if (data.profileImage) {
          setAvatarSrc(data.profileImage);
        } else {
          const firstLetter = data.name?.[0]?.toUpperCase();
          if (firstLetter && /^[A-Z]$/.test(firstLetter)) {
            setAvatarSrc(`/assest2/Alphabet/${firstLetter}.png`);
          } else {
            setAvatarSrc(`/assest2/Alphabet/default.png`);
          }
        }
      } catch (error) {
        console.error('Error loading user avatar:', error);
        setAvatarSrc(`/assest2/Alphabet/default.png`);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Image
      src={avatarSrc}
      alt="User Avatar"
      width={size}
      height={size}
      className="rounded-full object-cover cursor-pointer"
    />
  );
}
