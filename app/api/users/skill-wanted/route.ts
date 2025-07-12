import { skillsWantedByUser } from "@/controllers/user/skillsWanted";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  return await skillsWantedByUser(req);
};
