import { z } from "zod";

export const messageValidationSchema = z.object({
  text: z.string().min(1, "Text must be at least 1 character long"),
});

export type TMessage = z.infer<typeof messageValidationSchema>;
