import { prisma } from "@/db/prisma";
import { NextResponse, NextRequest } from "next/server";

export const getAllUsers = async (_req: NextRequest) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isPublic: true,
        role: "USER",
      },
      select: {
        id: true,
        username: true,
        profilePhoto: true,
        location: true,
        availabilities: true,
        skillsOffered: {
          select: {
            skill: {
              select: { name: true },
            },
          },
        },
        skillsWanted: {
          select: {
            skill: {
              select: { name: true },
            },
          },
        },
        feedbackReceived: {
          select: { rating: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const professionals = users.map((user) => {
      const ratings = user.feedbackReceived.map((f) => f.rating);
      const averageRating =
        ratings.length > 0
          ? parseFloat(
              (ratings.reduce((acc, r) => acc + r, 0) / ratings.length).toFixed(
                1
              )
            )
          : 0;

      return {
        id: user.id,
        name: user.username,
        avatar: user.profilePhoto || "",
        location: user.location || "Unknown",
        rating: averageRating,
        available: user.availabilities.length > 0,
        skillsOffered: user.skillsOffered.map((s) => s.skill.name),
        skillsWanted: user.skillsWanted.map((s) => s.skill.name),
      };
    });

    return NextResponse.json({ users: professionals }, { status: 200 });
  } catch (error) {
    console.error("[GET_ALL_USERS_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
