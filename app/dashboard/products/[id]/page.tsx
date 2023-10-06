import { redirect } from 'next/navigation';

import prismadb from '@/lib/prisma';
import { getUserSession } from '@/lib/user-session';
import { updateOrCreateProduct } from '@/actions/products';

import { SubmitButton } from './_components/submit-button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface GetProductArgs {
	productId: string;
	userId: string;
}

const getProductById = async ({ productId, userId }: GetProductArgs) => {
	return await prismadb.product.findUnique({
		where: {
			id: productId,
			userId,
		},
		select: {
			description: true,
			name: true,
			price: true,
			inStock: true,
			tags: true,
		},
	});
};

interface Props {
	params: { id: string };
}

const DashboardProductByIdPage: React.FC<Props> = async ({ params }) => {
	const session = await getUserSession();
	if (!session) {
		redirect('/auth/login');
	}
	const userId = session.user.id;
	const product = await getProductById({
		productId: params.id,
		userId,
	});

	const isEditForm = !!product;

	const title = isEditForm ? `Edit ${product.name}` : 'Create Product';

	return (
		<div className='space-y-5'>
			<h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
			<form
				action={async (formData) => {
					'use server';
					await updateOrCreateProduct({
						formData,
						userId,
						productId: params.id,
					});
					redirect(`/dashboard/products`);
				}}
			>
				<div className='grid grid-cols-2 gap-5'>
					<div className='flex flex-col gap-3'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							name='name'
							type='text'
							data-cy='nameInput'
							defaultValue={product?.name}
						/>
					</div>

					<div className='flex flex-col gap-3'>
						<Label htmlFor='price'>Price</Label>
						<Input
							id='price'
							name='price'
							type='number'
							data-cy='priceInput'
							defaultValue={product?.price}
						/>
					</div>
					<div className='flex flex-col gap-3'>
						<Label htmlFor='inStock'>In Stock</Label>
						<Input
							id='inStock'
							name='inStock'
							type='number'
							data-cy='inStockInput'
							defaultValue={product?.inStock}
						/>
					</div>
					<div className='flex flex-col gap-3'>
						<Label htmlFor='tags'>Tags</Label>
						<Input
							id='tags'
							name='tags'
							type='text'
							data-cy='tagsInput'
							defaultValue={product?.tags.join(', ')}
						/>
					</div>
					<div className='flex flex-col gap-3 col-span-2'>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							name='description'
							data-cy='descriptionTextarea'
							defaultValue={product?.description}
						/>
					</div>
					<div className='justify-self-end col-start-2'>
						<SubmitButton />
					</div>
				</div>
			</form>
		</div>
	);
};

export default DashboardProductByIdPage;
