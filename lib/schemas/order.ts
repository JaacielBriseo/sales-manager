import { z } from 'zod';
import {
	deliveryMethodsTuple,
	orderStatusTuple,
	paymentMethodsTuple,
} from '../constants';
import { upsertCustomerSchema } from './customer';

const baseSchema = z.object({
	paymentMethod: z.enum(paymentMethodsTuple),
	deliveryMethod: z.enum(deliveryMethodsTuple),
	orderStatus: z.enum(orderStatusTuple),
	deadline: z.date().optional(),
	note: z.string().optional(),
	orderItems: z
		.array(
			z.object({
				productId: z.string().uuid(),
				quantity: z.number().int().positive(),
				unitPrice: z.number().positive(),
			}),
		)
		.min(1, 'You have to add at least one product'),
});

export const createOrderSchema = z.discriminatedUnion('isNewCustomer', [
	z
		.object({
			isNewCustomer: z.literal(true),
			newCustomer: upsertCustomerSchema,
		})
		.merge(baseSchema),
	z
		.object({
			isNewCustomer: z.literal(false),
			customerId: z
				.string({ required_error: 'You have to select a customer' })
				.uuid('Invalid customer ID'),
		})
		.merge(baseSchema),
]);

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;
