// app/api/swap-request/route.ts

import { skillSwapRequest } from "@/controllers/swap/skillSwapRequest";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  return skillSwapRequest(req);
};
