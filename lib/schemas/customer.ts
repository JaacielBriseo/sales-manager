import { z } from 'zod';

export const upsertCustomerSchema = z.object({
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	email: z.string().email().optional(),
	phoneNumber: z.string().regex(/^\+?[0-9]{10,14}$/),
	address: z
		.object({
			streetName: z.string().optional(),
			streetNumber: z.string().optional(),
			neighborhood: z.string().optional(),
			city: z.string().optional(),
			state: z.string().optional(),
			country: z.string().optional(),
			postalCode: z.string().optional(),
		})
		.optional(),
});
