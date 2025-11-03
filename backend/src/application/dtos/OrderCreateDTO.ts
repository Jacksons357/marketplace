import z from "zod";

export const orderCreateSchema = z.object({
  organizationId: z.uuid(),
  items: z.array(z.object({
    productId: z.uuid(),
    organizationId: z.uuid(),
    quantity: z.number(),
    priceAtPurchase: z.number(),
  })),
}).strict()

export type OrderCreateDTO = z.infer<typeof orderCreateSchema>
