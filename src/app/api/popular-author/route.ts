// src/app/api/popular-authors/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/db';
import Blog from '@/lib/models/BlogModel';
import User from '@/lib/models/UserModel';

export async function GET(request: Request) {
  await connectDB();

  try {
    const authors = await Blog.aggregate([
      {
        $group: {
          _id: '$createdBy',
          blogCount: { $sum: 1 },
        },
      },
      {
        $sort: { blogCount: -1 },
      },
      {
        $limit: 5, // Top 5 authors
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          name: '$user.name',
          email: '$user.email',
          profileImage: '$user.profileImage',
          blogCount: 1,
        },
      },
    ]);

    return NextResponse.json(authors);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch popular authors' },
      { status: 500 },
    );
  }
}
