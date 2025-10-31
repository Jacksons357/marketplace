import z from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.preprocess((val) => {
    if (typeof val === "string") {
      const normalized = val.replace(",", ".");
      const parsed = parseFloat(normalized);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val
  }, z.number().min(0)),

  category: z.string().min(1),
  imageUrl: z.string().url(),
  stockQty: z.number().min(0),
  weightGrams: z.number().min(0),
}).strict();

export type ProductCreateDTO = z.infer<typeof productCreateSchema>
