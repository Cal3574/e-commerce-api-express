import { z, ZodSchema } from "zod";

export const addProductSchema: ZodSchema<{
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  categoryId: number;
}> = z.object({
  name: z.string().min(2).max(255),
  price: z.number().positive(),
  quantity: z.number().positive(),
  description: z.string().min(2).max(255),
  image: z.string().min(2).max(255),
  categoryId: z.number().positive(),
});

export const deleteProductSchema: ZodSchema<{ product_id: number }> = z.object({
  product_id: z.number().positive(),
});
