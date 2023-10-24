'use server';

import prismadb from '@/lib/prisma';
import { CreateOrderFormValues } from '@/lib/schemas/order';
import { isErrorInstance } from '@/lib/type-guards';
import { getUserSession } from '@/lib/user-session';
import { revalidatePath } from 'next/cache';

export const createOrderAction = async (values: CreateOrderFormValues) => {
	const session = await getUserSession();

	if (!session) {
		return {
			message: 'You have to be logged in to create an order',
		};
	}
	let customerId: string;
	if (values.isNewCustomer) {
		const { firstName, lastName, email, phoneNumber, address } =
			values.newCustomer;

		const customer = await prismadb.customer.create({
			data: {
				firstName,
				lastName,
				email,
				phoneNumber,
				userId: session.user.id,
			},
		});
		customerId = customer.id;
	} else {
		customerId = values.customerId;
	}

	const {
		deliveryMethod,
		orderItems,
		orderStatus,
		paymentMethod,
		deadline,
		note,
	} = values;

	try {
		const order = await prismadb.order.create({
			data: {
				deliveryMethod,
				payedTotal: 0,
				paymentMethod,
				status: orderStatus,
				deadline,
				note,
				orderItems: {
					create: orderItems.map((item) => ({
						quantity: item.quantity,
						product: {
							connect: {
								id: item.productId,
							},
						},
					})),
				},
				customerId,
				userId: session.user.id,
				total: orderItems.reduce(
					(acc, curr) => acc + curr.unitPrice * curr.quantity,
					0,
				),
			},
		});

		revalidatePath(`/dashboard/orders`);
	} catch (error) {
		console.log(error);
		return {
			message: isErrorInstance(error) ? error.message : 'Something went wrong',
		};
	}
};
