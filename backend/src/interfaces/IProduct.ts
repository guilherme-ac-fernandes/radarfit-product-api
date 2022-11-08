import { z } from 'zod';

// Utilização de valor default para os campos de created e updated
// source: https://stackoverflow.com/questions/72771130/how-to-make-an-optional-property-with-a-default-value-in-zod
const ProductZodSchema = z.object({
  produto: z.string(),
  valor: z.number(),
  descricao: z.string(),
  created: z.date().default(() => new Date()),
  updated: z.date().default(() => new Date()),
});

type IProduct = z.infer<typeof ProductZodSchema>;

export { ProductZodSchema, IProduct };