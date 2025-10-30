import z from "zod";

export const registerAdminSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email format"),
  phone: z.string().min(10, "Phone must be at least 10 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  organizationName: z.string().min(3, "Organization name must be at least 3 characters long"),
  organizationDescription: z.string().optional(),
})

export type RegisterAdminDTO = z.infer<typeof registerAdminSchema>
