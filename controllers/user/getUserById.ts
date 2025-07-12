import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const getUserById = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
      where: { toUserId: userId },
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
    console.error("[GET_USER_BY_ID_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
};
