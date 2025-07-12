import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { SwapRequestInput, swapRequestSchema } from "@/zodSchemas/swapRequestSchema";

export const skillSwapRequest = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = swapRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }

    const { fromUserId, toUserId, skillOfferedId, skillWantedId } = parsed.data;

    // Optional: Check if swap already exists
    const existingSwap = await prisma.swapRequest.findFirst({
      where: {
        fromUserId,
        toUserId,
        skillOfferedId,
        skillWantedId,
      },
    });

    if (existingSwap) {
      return NextResponse.json({ error: "Swap request already exists." }, { status: 409 });
    }

    const newSwap = await prisma.swapRequest.create({
      data: {
        fromUserId,
        toUserId,
        skillOfferedId,
        skillWantedId,
      },
    });

    return NextResponse.json({ message: "Swap request sent", swapId: newSwap.id }, { status: 201 });
  } catch (error) {
    console.error("[SWAP_REQUEST_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
