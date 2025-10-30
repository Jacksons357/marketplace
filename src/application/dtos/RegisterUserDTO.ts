import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone must be at least 10 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type RegisterUserDTO = z.infer<typeof registerUserSchema>
