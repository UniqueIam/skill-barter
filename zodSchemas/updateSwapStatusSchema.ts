import { z } from "zod";

export const updateSwapStatusSchema = z.object({
  swapId: z.string().min(1, "Swap ID is required"),
  newStatus: z.enum(["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"]),
});

export type UpdateSwapStatusInput = z.infer<typeof updateSwapStatusSchema>;
