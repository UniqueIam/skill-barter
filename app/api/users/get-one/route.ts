// api/user/get-one/route.ts

import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isPublic: true,
        createdAt: true,
        profilePhoto: true,
        location: true,
        skillsOffered: {
          select: {
            skill: {
              select: { id: true, name: true },
            },
          },
        },
        skillsWanted: {
          select: {
            skill: {
              select: { id: true, name: true },
            },
          },
        },
        availabilities: {
          select: {
            id: true,
            day: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const ratings = await prisma.feedback.findMany({
      where: { toUserId: user.id },
      select: { rating: true },
    });

    const formattedUser = {
      ...user,
      skillsOffered: user.skillsOffered.map((s) => s.skill),
      skillsWanted: user.skillsWanted.map((s) => s.skill),
      ratings: ratings.map((r) => r.rating),
    };

    return NextResponse.json({ user: formattedUser }, { status: 200 });
  } catch (error) {
    console.error("[GET_LOGGED_IN_USER_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
};
