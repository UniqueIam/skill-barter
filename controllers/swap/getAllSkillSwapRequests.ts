import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET all swap requests related to a specific user
export const getAllSwapRequest = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required in query params" }, { status: 400 });
    }

    const swaps = await prisma.swapRequest.findMany({
      where: {
        OR: [
          { fromUserId: userId },
          { toUserId: userId },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        fromUser: {
          select: {
            id: true,
            username: true,
            email: true,
            profilePhoto: true,
          },
        },
        toUser: {
          select: {
            id: true,
            username: true,
            email: true,
            profilePhoto: true,
          },
        },
        skillOffered: {
          select: {
            id: true,
            name: true,
          },
        },
        skillWanted: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ data: swaps }, { status: 200 });
  } catch (error) {
    console.error("[GET_USER_SWAP_REQUESTS_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
