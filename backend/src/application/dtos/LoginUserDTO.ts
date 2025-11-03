import z from "zod";

export const loginUserSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
}).strict()

export type LoginUserDTO = z.infer<typeof loginUserSchema>
