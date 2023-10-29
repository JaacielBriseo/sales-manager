import { notFound, redirect } from 'next/navigation';

import prismadb from '@/lib/prisma';
import { formatAddress } from '@/lib/utils';
import { getUserSession } from '@/lib/user-session';
import { formatToDMY } from '@/lib/services/date-fns';

import { CustomerInfoCard } from '@/components/dashboard/customers/customer-info-card';
import { CustomerOrdersDataTable } from '@/components/dashboard/customers/table/customers-data-table';
import { customerOrdersDataColumns } from '@/components/dashboard/customers/table/customers-data-columns';

interface Props {
	params: { id: string };
}

const getCustomerById = async (customerId: string, userId: string) => {
	if (!customerId || customerId === 'new') {
		return null;
	}
	return await prismadb.customer.findUnique({
		where: {
			id: customerId,
			userId,
		},
		include: {
			address: true,
			orders: true,
		},
	});
};

const DashboardCustomersByIdPage: React.FC<Props> = async ({ params }) => {
	const session = await getUserSession();

	if (!session) {
		redirect('/auth/login');
	}

	const customer = await getCustomerById(params.id, session.user.id);

	if (!customer) {
		notFound();
	}
	const {
		address,
		createdAt,
		email,
		firstName,
		lastName,
		orders,
		phoneNumber,
	} = customer;

	const fullName = firstName.concat(' ', lastName);
	const fullAddress = address ? formatAddress(address) : '';
	return (
		<div className='w-full flex flex-col gap-5'>
			<section>
				<CustomerInfoCard
					createdAt={formatToDMY(createdAt)}
					email={email}
					id={customer.id}
					fullName={fullName}
					phoneNumber={phoneNumber}
					address={fullAddress}
				/>
			</section>
			<section className='space-y-3'>
				<h2 className='text-lg font-semibold'>Orders</h2>
				<CustomerOrdersDataTable
					data={orders}
					columns={customerOrdersDataColumns}
				/>
			</section>
		</div>
	);
};

export default DashboardCustomersByIdPage;
