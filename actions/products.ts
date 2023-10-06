'use server';

import { revalidatePath } from 'next/cache';
import prismadb from '@/lib/prisma';
import { z } from 'zod';

import { isErrorInstance } from '@/lib/type-guards';
import { getUserSession } from '@/lib/user-session';

const productSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	inStock: z.number(),
	tags: z.array(z.string()),
});

interface UpsertProductArgs {
	formData: FormData;
	userId: string;
	productId?: string;
}
export const updateOrCreateProduct = async (args: UpsertProductArgs) => {
	const { formData, userId, productId } = args;

	const data = {
		name: formData.get('name'),
		description: formData.get('description'),
		price: Number(formData.get('price')),
		inStock: Number(formData.get('inStock')),
		tags:
			formData
				.get('tags')
				?.toString()
				.split(',')
				.map((tag) => tag.trim().replaceAll(' ', '-')) ?? [],
	};

	try {
		const parsedProduct = productSchema.safeParse(data);

		if (!parsedProduct.success) {
			throw new Error('Invalid product data');
		}

		await prismadb.product.upsert({
			where: {
				id: productId,
			},
			create: {
				...parsedProduct.data,
				userId,
			},
			update: parsedProduct.data,
		});

		revalidatePath(`/dashboard/products`);
	} catch (error) {
		console.log(error);
		return {
			message: isErrorInstance(error) ? error.message : 'Something went wrong',
		};
	}
};

export const deleteManyProducts = async (data: FormData) => {
	try {
		const session = await getUserSession();

		if (!session) throw new Error('Not logged in');

		const productIds = data.get('productIds');

		const parse = z
			.array(z.string())
			.safeParse(productIds?.toString().split(','));

		if (!parse.success) throw new Error('Invalid product ids');

		await prismadb.product.deleteMany({
			where: {
				userId: session.user.id,
				id: {
					in: parse.data,
				},
			},
		});

		revalidatePath(`/dashboard/products`);
		return {
			message: 'Products deleted successfully',
		};
	} catch (error) {
		console.log(error);
		return {
			message: isErrorInstance(error) ? error.message : 'Something went wrong',
		};
	}
};

export const deleteProduct = async (data: FormData) => {
	try {
		const session = await getUserSession();

		if (!session) throw new Error('Not logged in');

		const productId = data.get('productId');

		await prismadb.product.delete({
			where: {
				userId: session.user.id,
				id: productId?.toString(),
			},
		});

		revalidatePath(`/dashboard/products`);
		return {
			message: 'Product deleted successfully',
		};
	} catch (error) {
		console.log(error);
		return {
			message: isErrorInstance(error) ? error.message : 'Something went wrong',
		};
	}
};
