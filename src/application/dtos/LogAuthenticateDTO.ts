import z from "zod";

export const logAuthenticateSchema = z.object({
  username: z.string(),
  password: z.string(),
}).strict()

export type LogAuthenticateDTO = z.infer<typeof logAuthenticateSchema>