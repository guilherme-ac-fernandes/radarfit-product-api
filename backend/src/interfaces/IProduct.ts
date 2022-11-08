import { z } from 'zod';

const ProductZodSchema = z.object({
  produto: z.string(),
  valor: z.number(),
  descricao: z.string(),
});

type IProduct = z.infer<typeof ProductZodSchema>;

export { ProductZodSchema, IProduct };