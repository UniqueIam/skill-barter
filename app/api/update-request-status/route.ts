import { updateSwapStatus } from "@/controllers/swap/updateSwapStatus";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  return updateSwapStatus(req);
}
