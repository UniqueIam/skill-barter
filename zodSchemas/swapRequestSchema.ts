// zodSchemas/swapRequestSchema.ts
import { z } from "zod";

export const swapRequestSchema = z.object({
  fromUserId: z.string().min(1),
  toUserId: z.string().min(1),
  skillOfferedId: z.string().min(1),
  skillWantedId: z.string().min(1),
});

export type SwapRequestInput = z.infer<typeof swapRequestSchema>;
