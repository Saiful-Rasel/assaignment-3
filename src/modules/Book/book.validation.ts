import { z } from "zod";

const genreEnum = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.enum(genreEnum).optional(),
    isbn: z.string(),
    description: z.string().optional(),
    copies: z.number().min(0),
    available: z.boolean().optional(),
  }),
});
