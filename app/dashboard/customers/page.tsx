import { redirect } from 'next/navigation';

import prismadb from '@/lib/prisma';
import { getUserSession } from '@/lib/user-session';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const getCustomers = async (userId: string) => {
	const customers = await prismadb.customer.findMany({
		where: {
			userId,
			isActive: true,
		},
		select: {
			createdAt: true,
			address: {
				select: {
					city: true,
					state: true,
					neighborhood: true,
					streetName: true,
					streetNumber: true,
					postalCode: true,
				},
			},
			firstName: true,
			lastName: true,
			email: true,
			phoneNumber: true,
			id: true,
		},
	});

	return customers.map((customer) => {
		let fullAddress = '';

		if (customer.address) {
			fullAddress = `${customer.address.streetName} #${customer.address.streetNumber}, ${customer.address.neighborhood}, ${customer.address.city}, ${customer.address.state}`;
		}

		return {
			...customer,
			address: fullAddress,
		};
	});
};

const DashboardCustomersPage = async () => {
	const session = await getUserSession();

	if (!session) {
		redirect('/auth/login');
	}

	const customers = await getCustomers(session.user.id);
	return (
		<div className='flex flex-col gap-5'>
			<div>
				<h1 className='text-2xl font-bold tracking-tight'>Customers</h1>
				<p className='text-muted-foreground'>A list of your customers</p>
			</div>
			<DataTable
				columns={columns}
				data={customers}
			/>
		</div>
	);
};

export default DashboardCustomersPage;
