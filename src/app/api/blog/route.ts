import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import BlogModel from '@/lib/models/BlogModel';
import cloudinary from '@/lib/config/cloudinary';

import type { NextRequest } from 'next/server';
import { getUserFromToken } from '@/lib/Auth/Auth';

export async function GET(request: NextRequest) {
  await connectDB();
  const blogId = request.nextUrl.searchParams.get('id');
  const authorId = request.nextUrl.searchParams.get('userData');
  if (authorId) {
    console.log(`Fetching blogs for author: ${authorId}`);
    const blogs = await BlogModel.find({ createdBy: authorId });
    return NextResponse.json({
      success: true,
      blogs,
    });
  }
  if (blogId) {
    console.log(`Fetching blog with ID: ${blogId}`);
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({
      success: true,
      blog,
    });
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({
      success: true,
      blogs,
    });
  }
}

// export async function POST(request: NextRequest) {
//   // const formdata = await request.formData();
//   // const timeStamp = Date.now();

//   // const image = formdata.get('image');
//   // const imageByteData = await image.arrayBuffer();
//   // const imageBuffer = Buffer.from(imageByteData);
//   // const path = `./public/${timeStamp}_${image.name}`;
//   // await writeFile(path, imageBuffer);
//   // const imageUrl = `/${timeStamp}_${image.name}`;

//   // const blogData = {
//   //   title: formdata.get('title'),
//   //   description: formdata.get('description'),
//   //   category: formdata.get('category'),
//   //   author: formdata.get('author'),
//   //   authorImage: formdata.get('authorImage'),
//   //   image: imageUrl,
//   // };

//   // await BlogModel.create(blogData);
//   // console.log('Blog created:', blogData);

//   // return NextResponse.json({
//   //   success: true,
//   //   message: 'Blog created successfully',
//   //   blog: blogData,
//   // });
//   await connectDB();

//   const formdata = await request.formData();
//   const timeStamp = Date.now();

//   const user = await getUserFromToken(request);
//   if (!user) {
//     return NextResponse.json(
//       { success: false, message: 'Unauthorized' },
//       { status: 401 },
//     );
//   }

//   // Handle Blog Image
//   const image = formdata.get('image');
//   if (!image) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Blog image is required',
//       },
//       { status: 400 },
//     );
//   }
//   if (!(image instanceof File)) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Blog image must be a file',
//       },
//       { status: 400 },
//     );
//   }
//   const imageByteData = await image.arrayBuffer();
//   const imageBuffer = Buffer.from(imageByteData);
//   const imageBase64 = `data:${image.type};base64,${imageBuffer.toString(
//     'base64',
//   )}`;
//   const imageUploadResponse = await cloudinary.uploader.upload(imageBase64, {
//     folder: 'blog_images',
//     public_id: `${timeStamp}_${image.name.split('.')[0]}`,
//   });

//   // Handle Author Image
//   let authorImgUrl = '';
//   const authorImage = formdata.get('authorImage');
//   if (authorImage && typeof authorImage !== 'string') {
//     const authorImgByteData = await authorImage.arrayBuffer();
//     const authorImgBuffer = Buffer.from(authorImgByteData);
//     const authorImgBase64 = `data:${
//       authorImage.type
//     };base64,${authorImgBuffer.toString('base64')}`;
//     const authorImageUploadResponse = await cloudinary.uploader.upload(
//       authorImgBase64,
//       {
//         folder: 'author_images',
//         public_id: `${timeStamp}_${authorImage.name.split('.')[0]}`,
//       },
//     );
//     authorImgUrl = authorImageUploadResponse.secure_url;
//   } else {
//     // fallback default
//     authorImgUrl =
//       (formdata.get('defaultAuthorImage') as string) ||
//       '/Assets/profile_icon.png';
//   }

//   const blogData = {
//     title: formdata.get('title'),
//     description: formdata.get('description'),
//     category: formdata.get('category'),
//     author: formdata.get('author'),
//     image: imageUploadResponse.secure_url,
//     authorImage: authorImgUrl,
//     blogContent: formdata.get('blogContent'),
//   };

//   await BlogModel.create(blogData);
//   return NextResponse.json({
//     success: true,
//     message: 'Blog created successfully',
//     blog: blogData,
//   });
// }

export async function POST(req: NextRequest) {
  await connectDB();

  const formData = await req.formData();
  const timeStamp = Date.now();

  // ✅ Authenticate user
  const user = await getUserFromToken(req);
  console.log('Authenticated user:', user);
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  // ✅ Validate blog image (required)
  const image = formData.get('image');
  if (!image || !(image instanceof File)) {
    return NextResponse.json(
      { success: false, message: 'A valid blog image is required.' },
      { status: 400 },
    );
  }

  // ✅ Upload blog image to Cloudinary
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const imageBase64 = `data:${image.type};base64,${imageBuffer.toString(
    'base64',
  )}`;
  const imageUpload = await cloudinary.uploader.upload(imageBase64, {
    folder: 'blog_images',
    public_id: `${timeStamp}_${image.name.split('.')[0]}`,
  });

  // ✅ Use user's profile image or fallback

  const authorImageUrl = user.profileImage || '/Assets/profile_icon.png';

  // ✅ Create and save blog
  const newBlog = new BlogModel({
    title: formData.get('title'),
    description: formData.get('description'),
    blogContent: formData.get('blogContent'),
    image: imageUpload.secure_url,
    category: formData.get('category'),
    tags: formData.get('tags') || '',
    author: user.name,
    authorImage: authorImageUrl,
    createdBy: user.id,
  });

  await newBlog.save();

  return NextResponse.json(
    {
      success: true,
      message: 'Blog created successfully.',
      blog: newBlog,
    },
    { status: 201 },
  );
}
