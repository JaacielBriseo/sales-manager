'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prismadb from '@/lib/prisma';
import { z } from 'zod';

const productSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	inStock: z.number(),
	tags: z.array(z.string()),
});

interface FormActionArgs {
	formData: FormData;
	userId: string;
	productId?: string;
}
export const formAction = async (args: FormActionArgs) => {
	'use server';
	const { formData, userId, productId } = args;

	const parsedData = {
		name: formData.get('name'),
		description: formData.get('description'),
		price: Number(formData.get('price')),
		inStock: Number(formData.get('inStock')),
		tags: [formData.get('tags')],
	};

	const product = productSchema.parse(parsedData);

	if (productId && productId !== 'new') {
		await prismadb.product.update({
			where: {
				id: productId,
				userId,
			},
			data: product,
		});
	} else {
		await prismadb.product.create({
			data: {
				...product,
				userId,
			},
		});
	}

	revalidatePath(`/dashboard/products`);
	redirect(`/dashboard/products`);
};
