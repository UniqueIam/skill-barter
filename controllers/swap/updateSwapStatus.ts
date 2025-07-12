import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { updateSwapStatusSchema } from "@/zodSchemas/updateSwapStatusSchema";

export const updateSwapStatus = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = updateSwapStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }

    const { swapId, newStatus } = parsed.data;

    // Fetch the existing swap request
    const swap = await prisma.swapRequest.findUnique({
      where: { id: swapId },
    });

    if (!swap) {
      return NextResponse.json({ error: "Swap request not found" }, { status: 404 });
    }

    // Update the status
    const updatedSwap = await prisma.swapRequest.update({
      where: { id: swapId },
      data: { status: newStatus },
    });

    if (newStatus === "ACCEPTED") {
      // Add skillOffered to toUser's skillsWanted
      const wantedExists = await prisma.userSkillWanted.findFirst({
        where: {
          userId: swap.toUserId,
          skillId: swap.skillOfferedId,
        },
      });

      if (!wantedExists) {
        await prisma.userSkillWanted.create({
          data: {
            userId: swap.toUserId,
            skillId: swap.skillOfferedId,
          },
        });
      }

      // Add skillWanted to fromUser's skillsOffered
      const offeredExists = await prisma.userSkillOffered.findFirst({
        where: {
          userId: swap.fromUserId,
          skillId: swap.skillWantedId,
        },
      });

      if (!offeredExists) {
        await prisma.userSkillOffered.create({
          data: {
            userId: swap.fromUserId,
            skillId: swap.skillWantedId,
          },
        });
      }
    }

    return NextResponse.json({ message: "Swap status updated successfully", status: updatedSwap.status }, { status: 200 });

  } catch (error) {
    console.error("[UPDATE_SWAP_STATUS_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
