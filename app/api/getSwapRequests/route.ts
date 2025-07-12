import { getAllSwapRequest } from "@/controllers/swap/getAllSkillSwapRequests";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getAllSwapRequest(req);
}
