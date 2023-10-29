'use server';

import { revalidatePath } from 'next/cache';
import prismadb from '@/lib/prisma';
import { z } from 'zod';

import { isErrorInstance } from '@/lib/type-guards';
import { getUserSession } from '@/lib/user-session';
import { buildLogger } from '@/lib/services/logger';
import {
	productSchema,
	type ProductSchema as ProductSchemaType,
} from '@/lib/schemas/products';

const logger = buildLogger('[ProductsActions]');

interface UpsertProductArgs {
	productId?: string;
	data: ProductSchemaType;
}
export const upsertProductAction = async (args: UpsertProductArgs) => {
	const { data, productId } = args;

	const session = await getUserSession();

	if (!session) {
		return {
			error: 'Not logged in',
		};
	}

	const tags = data.tags.split(',').map((tag) => tag.trim());

	try {
		await prismadb.product.upsert({
			where: {
				id: productId ?? '',
			},
			create: {
				...data,
				tags,
				userId: session.user.id,
			},
			update: { ...data, tags },
		});

		revalidatePath(`/dashboard/products`);
		return {
			message: 'Product saved successfully',
		};
	} catch (error) {
		logger.error(`[UpsertAction] - ${error}`);
		return {
			error: isErrorInstance(error) ? error.message : 'Something went wrong',
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

		await prismadb.product.updateMany({
			where: {
				userId: session.user.id,
				id: {
					in: parse.data,
				},
			},
			data: {
				isActive: false,
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

		await prismadb.product.update({
			where: {
				userId: session.user.id,
				id: productId?.toString(),
			},
			data: {
				isActive: false,
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
