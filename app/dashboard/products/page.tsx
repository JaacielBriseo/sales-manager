import { redirect } from 'next/navigation';

import prismadb from '@/lib/prisma';
import { getUserSession } from '@/lib/user-session';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { QueryOptions } from '@/interfaces';
import { dbQueryParamsSchema } from '@/lib/schemas/db-query-params';

const getProducts = async (userId: string, options?: QueryOptions) => {
	return await prismadb.product.findMany({
		where: {
			userId,
			isActive: true,
			...(options?.query && {
				OR: [
					{ name: { contains: options.query, mode: 'insensitive' } },
					{ shortDescription: { contains: options.query, mode: 'insensitive' } },
					{ tags: { has: options.query } },
				],
			}),
		},
		select: {
			id: true,
			name: true,
			price: true,
			inStock: true,
			tags: true,
			shortDescription: true,
			createdAt: true,
		},
		...(options && {
			skip: options.perPage * (options.page - 1),
			take: options.perPage,
		}),
	});
};

interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
}
const DashboardProductsPage = async ({ searchParams }: Props) => {
	const session = await getUserSession();

	if (!session) {
		redirect('/auth/login');
	}

	const { page, perPage, query } = dbQueryParamsSchema.parse(searchParams);

	const products = await getProducts(session.user.id, {
		page: Number(page),
		perPage: Number(perPage),
		query,
	});

	return (
		<div className='flex flex-col gap-5'>
			<div>
				<h1 className='text-2xl font-bold tracking-tight'>Products</h1>
				<p className='text-muted-foreground'>A list of your products</p>
			</div>
			<DataTable
				columns={columns}
				data={products}
				page={page}
				perPage={perPage}
				pageCount={Math.ceil(products.length / perPage)}
			/>
		</div>
	);
};

export default DashboardProductsPage;
