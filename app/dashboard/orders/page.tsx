import { getUserSession } from '@/lib/user-session';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prisma';

const getOrders = async (userId: string) => {
	const orders = await prismadb.order.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			total: true,
			payedTotal: true,
			status: true,
			deadline: true,
			deliveredAt: true,
			customer: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
			orderItems: {
				select: {
					product: {
						select: {
							id: true,
							name: true,
						},
					},
					quantity: true,
				},
			},
		},
	});

	return orders.map((order) => ({
		...order,
		customerName: `${order.customer.firstName} ${order.customer.lastName}`,
		items: order.orderItems.map((orderItem) => ({
			...orderItem,
			productId: orderItem.product.id,
			productName: orderItem.product.name,
		})),
	}));
};

const DashboardOrdersPage = async () => {
	const session = await getUserSession();
	if (!session) {
		redirect('/auth/login');
	}

	const orders = await getOrders(session.user.id);
	return (
		<div className='flex flex-col gap-5'>
			<div>
				<h1 className='text-2xl font-bold tracking-tight'>Orders</h1>
				<p className='text-muted-foreground'>A list of your orders</p>
			</div>
			<DataTable
				columns={columns}
				data={orders}
			/>
		</div>
	);
};

export default DashboardOrdersPage;
