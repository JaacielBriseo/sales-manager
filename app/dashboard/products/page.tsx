import { redirect } from 'next/navigation';

import prismadb from '@/lib/prisma';
import { getUserSession } from '@/lib/user-session';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const getProducts = async (userId: string) => {
	return await prismadb.product.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			name: true,
			price: true,
			inStock: true,
			tags: true,
			description: true,
		},
	});
};

const DashboardProductsPage = async () => {
	const session = await getUserSession();

	if (!session) {
		redirect('/auth/login');
	}

	const products = await getProducts(session.user.id);

	return (
		<div className='flex flex-col gap-5'>
			<div>
				<h1 className='text-2xl font-bold tracking-tight'>Products</h1>
				<p className='text-muted-foreground'>A list of your products</p>
			</div>
			<DataTable
				columns={columns}
				data={products}
			/>
		</div>
	);
};

export default DashboardProductsPage;
