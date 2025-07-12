import { z } from "zod";

export const addUserSkillSchema = z.object({
  userId: z.string(),
  skillName: z.string().min(1),
  type: z.enum(["offered", "wanted"]),
});

export type AddUserSkillInput = z.infer<typeof addUserSkillSchema>;
