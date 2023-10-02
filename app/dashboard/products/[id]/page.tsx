import { redirect } from 'next/navigation';
import prismadb from '@/lib/prisma';
import { getUserSession } from '@/lib/user-session';
import { formAction } from './_actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SubmitButton } from './_components/submit-button';

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

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic';

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
					await formAction({ formData, userId, productId: params.id });
				}}
			>
				<div className='grid grid-cols-2 gap-5'>
					<div className='flex flex-col gap-3'>
						<Label htmlFor='name'>Name</Label>
						<Input
							type='text'
							name='name'
							defaultValue={product?.name}
						/>
					</div>

					<div className='flex flex-col gap-3'>
						<Label htmlFor='price'>Price</Label>
						<Input
							type='number'
							name='price'
							defaultValue={product?.price}
						/>
					</div>
					<div className='flex flex-col gap-3'>
						<Label htmlFor='inStock'>In Stock</Label>
						<Input
							type='number'
							name='inStock'
							defaultValue={product?.inStock}
						/>
					</div>
					<div className='flex flex-col gap-3'>
						<Label htmlFor='tags'>Tags</Label>
						<Input
							type='text'
							name='tags'
							defaultValue={product?.tags.join(', ')}
						/>
					</div>
					<div className='flex flex-col gap-3 col-span-2'>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							name='description'
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
