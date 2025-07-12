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

    // Check for existing swap
    const existingSwap = await prisma.swapRequest.findFirst({
      where: {
        fromUserId,
        toUserId,
        skillOfferedId,
        skillWantedId,
      },
    });

    if (existingSwap) {
      return NextResponse.json(
        { error: "Swap request already exists." },
        { status: 409 }
      );
    }

    // 1. Create the swap request
    const newSwap = await prisma.swapRequest.create({
      data: {
        fromUserId,
        toUserId,
        skillOfferedId,
        skillWantedId,
      },
    });

    // 2. Add skillOffered to toUser's `skillsWanted` if not already added
    const offeredAlreadyAdded = await prisma.userSkillWanted.findFirst({
      where: {
        userId: toUserId,
        skillId: skillOfferedId,
      },
    });

    if (!offeredAlreadyAdded) {
      await prisma.userSkillWanted.create({
        data: {
          userId: toUserId,
          skillId: skillOfferedId,
        },
      });
    }

    // 3. Add skillWanted to fromUser's `skillsOffered` if not already added
    const wantedAlreadyAdded = await prisma.userSkillOffered.findFirst({
      where: {
        userId: fromUserId,
        skillId: skillWantedId,
      },
    });

    if (!wantedAlreadyAdded) {
      await prisma.userSkillOffered.create({
        data: {
          userId: fromUserId,
          skillId: skillWantedId,
        },
      });
    }

    return NextResponse.json(
      { message: "Swap request sent & skills updated", swapId: newSwap.id },
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
