import { prisma } from "@/db/prisma";
import { NextResponse, NextRequest } from "next/server";

export const getAllUsers = async (req: NextRequest) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profilePhoto:true,
        isPublic: true,
        createdAt: true,

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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersWithRatings = await Promise.all(
      users.map(async (user) => {
        const ratings = await prisma.feedback.findMany({
          where: { toUserId: user.id },
          select: { rating: true },
        });

        return {
          ...user,
          skillsOffered: user.skillsOffered.map((s) => s.skill),
          skillsWanted: user.skillsWanted.map((s) => s.skill),
          ratings: ratings.map((r) => r.rating), 
        };
      })
    );

    return NextResponse.json({ users: usersWithRatings }, { status: 200 });
  } catch (error) {
    console.error("[GET_USERS_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};
