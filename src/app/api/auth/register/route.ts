import connectDB from '@/lib/config/db';
import User from '@/lib/models/UserModel';
import cloudinary from '@/lib/config/cloudinary';
import bcrypt from 'bcryptjs';

import type { NextRequest } from 'next/server';

// export async function POST(req: NextRequest) {
//   await connectDB();
//   const { name, email, password } = await req.json();
//   const existingUser = await User.findOne({ email });
//   if (existingUser)
//     return new Response(JSON.stringify({ message: 'User exists' }), {
//       status: 400,
//     });

//   const hashed = await bcrypt.hash(password, 10);
//   const user = new User({ name, email, password: hashed });
//   await user.save();

//   return new Response(JSON.stringify({ msg: 'User registered' }), {
//     status: 201,
//   });
// }
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formdata = await req.formData();
    const name = formdata.get('name') as string;
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const profileImage = formdata.get('profileImage');

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 400,
      });
    }

    let profileImageUrl = '/Assets/profile_icon.png'; // fallback default

    if (profileImage && typeof profileImage !== 'string') {
      const buffer = Buffer.from(await profileImage.arrayBuffer());
      const base64Image = `data:${profileImage.type};base64,${buffer.toString(
        'base64',
      )}`;

      const result = await cloudinary.uploader.upload(base64Image, {
        folder: 'user_profile_images',
        public_id: `${Date.now()}_${name.replace(/\s+/g, '_')}`,
      });

      profileImageUrl = result.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImage: profileImageUrl,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ message: 'Server error during registration' }),
      { status: 500 },
    );
  }
}
