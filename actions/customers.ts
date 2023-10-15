'use server';

import { revalidatePath } from 'next/cache';
import prismadb from '@/lib/prisma';

import { isErrorInstance } from '@/lib/type-guards';
import { getUserSession } from '@/lib/user-session';
import { upsertCustomerSchema } from '@/lib/schemas/customer';

export const upsertCustomer = async (data: FormData) => {
	const session = await getUserSession();
	if (!session) {
		return {
			message: 'Not logged in',
			ok: false,
		};
	}
	try {
		const customerIdField = data.get('customerId');

		const parse = upsertCustomerSchema.safeParse({
			firstName: data.get('firstName'),
			lastName: data.get('lastName'),
			email: data.get('email'),
			phoneNumber: data.get('phoneNumber'),
			address: {
				streetName: data.get('address.streetName'),
				streetNumber: data.get('address.streetNumber'),
				neighborhood: data.get('address.neighborhood'),
				city: data.get('address.city'),
				state: data.get('address.state'),
				country: data.get('address.country'),
				postalCode: data.get('address.postalCode'),
			},
		});

		if (!parse.success) {
			throw new Error(JSON.stringify(parse.error));
		}

		const { firstName, lastName, phoneNumber, address, email } = parse.data;

		await prismadb.$transaction(async ({ customer, address: addressModel }) => {
			const customerId = customerIdField?.toString() || '';

			let customerInDb = await customer.findFirst({
				where: {
					id: customerId,
					userId: session.user.id,
				},
			});

			if (!customerInDb) {
				customerInDb = await customer.create({
					data: {
						firstName,
						lastName,
						phoneNumber,
						email,
						userId: session.user.id,
					},
				});
			} else {
				await customer.update({
					where: {
						id: customerId,
						userId: session.user.id,
					},
					data: {
						firstName,
						lastName,
						phoneNumber,
						email,
					},
				});
			}

			const addressData = {
				city: address?.city || '',
				streetName: address?.streetName || '',
				streetNumber: address?.streetNumber || '',
				neighborhood: address?.neighborhood || '',
				state: address?.state || '',
				country: address?.country || '',
				postalCode: address?.postalCode || '',
				customerId: customerInDb.id,
			};

			await addressModel.upsert({
				where: {
					customerId: customerInDb.id,
				},
				create: addressData,
				update: addressData,
			});
		});

		revalidatePath(`/dashboard/customers`);
	} catch (error) {
		console.log(error);
	}
};

export const deleteCustomer = async (data: FormData) => {
	try {
		const session = await getUserSession();

		if (!session) throw new Error('Not logged in');

		const customerId = data.get('customerId');

		if (!customerId) throw new Error('Customer id not provided');

		await prismadb.customer.update({
			where: {
				userId: session.user.id,
				id: customerId?.toString(),
			},
			data: {
				isActive: false,
			},
		});

		revalidatePath(`/dashboard/customers`);
		return {
			message: 'Customer deleted successfully',
		};
	} catch (error) {
		console.log(error);
		return {
			message: isErrorInstance(error) ? error.message : 'Something went wrong',
		};
	}
};
