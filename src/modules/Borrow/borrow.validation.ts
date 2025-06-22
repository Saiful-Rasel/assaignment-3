
import { z } from "zod";

export const createBorrowZodSchema = z.object({
  book: z.string(),
  quantity: z.number().min(1),
  dueDate: z.string(),
});
