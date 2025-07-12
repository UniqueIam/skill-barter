import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { swapRequestSchema } from "@/zodSchemas/swapRequestSchema";

export const skillSwapRequest = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = swapRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { fromUserId, toUserId, skillOfferedId, skillWantedId } = parsed.data;

    // ✅ Verify foreign key existence
    const [fromUser, toUser, skillOffered, skillWanted] = await Promise.all([
      prisma.user.findUnique({ where: { id: fromUserId } }),
      prisma.user.findUnique({ where: { id: toUserId } }),
      prisma.skill.findUnique({ where: { id: skillOfferedId } }),
      prisma.skill.findUnique({ where: { id: skillWantedId } }),
    ]);

    if (!fromUser || !toUser || !skillOffered || !skillWanted) {
      return NextResponse.json(
        { error: "Invalid user or skill IDs." },
        { status: 400 }
      );
    }

    // ✅ Check if similar request already exists
    const existingSwap = await prisma.swapRequest.findFirst({
      where: {
        fromUserId,
        toUserId,
        skillOfferedId,
        skillWantedId,
        status: "PENDING",
      },
    });

    if (existingSwap) {
      return NextResponse.json(
        { error: "Swap request already exists and is pending." },
        { status: 409 }
      );
    }

    // ✅ Create new swap request only
    const newSwap = await prisma.swapRequest.create({
      data: {
        fromUserId,
        toUserId,
        skillOfferedId,
        skillWantedId,
        status: "PENDING", // Default, but explicitly added for clarity
      },
    });

    return NextResponse.json(
      {
        message: "Swap request created successfully",
        swapId: newSwap.id,
        status: newSwap.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SWAP_REQUEST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
