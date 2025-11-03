import z from "zod";

export const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.preprocess((val) => {
    if (typeof val === "string") {
      const normalized = val.replace(",", ".");
      const parsed = parseFloat(normalized);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val
  }, z.number().min(0).optional()),

  category: z.string().min(1).optional(),
  imageUrl: z.url().optional(),
  stockQty: z.number().min(0).optional(),
  weightGrams: z.number().min(0).optional(),
}).strict();

export type ProductUpdateDTO = z.infer<typeof productUpdateSchema>
