import z from "zod";

export const logCreateSchema = z.object({
  userId: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
  route: z.string(),
  method: z.string(),
  status: z.number(),
  latencyMs: z.number(),
  payload: z.record(z.string(), z.unknown()).optional().nullable(),
  createdAt: z.date().optional(),
})

export type LogCreateDTO = z.infer<typeof logCreateSchema>