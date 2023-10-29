import { notFound, redirect } from 'next/navigation';

import prismadb from '@/lib/prisma';
import { getUserSession } from '@/lib/user-session';

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

	if (!product) {
		// TODO: Create a 404 page
		notFound();
	}

	return (
		<div className='space-y-5'>
			<h1 className='text-2xl font-bold tracking-tight'>Product details</h1>
			{/* TODO: Product details */}
		</div>
	);
};

export default DashboardProductByIdPage;
