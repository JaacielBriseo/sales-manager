import { z } from 'zod';

export const productSchema = z.object({
	name: z.string().min(3, 'Name must contain at least 3 characters'),
	description: z.string(),
	price: z.coerce.number().positive('Price must be greater than $0'),
	inStock: z.coerce.number(),
	tags: z.string(),
});

export type ProductSchema = z.infer<typeof productSchema>;
