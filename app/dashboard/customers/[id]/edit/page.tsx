import { redirect } from 'next/navigation';

import { getUserSession } from '@/lib/user-session';
import prismadb from '@/lib/prisma';

import { UpsertCustomerForm } from '@/components/dashboard/customers/upsert-customer-form';

interface Props {
	params: { id: string };
}

const getCustomerById = async (customerId: string, userId: string) => {
	return await prismadb.customer.findUnique({
		where: {
			id: customerId,
			userId,
		},
		select: {
			firstName: true,
			lastName: true,
			email: true,
			phoneNumber: true,
			address: {
				select: {
					city: true,
					state: true,
					country: true,
					postalCode: true,
					streetName: true,
					streetNumber: true,
					neighborhood: true,
				},
			},
		},
	});
};

const CustomerEditPage: React.FC<Props> = async ({ params }) => {
	const session = await getUserSession();

	if (!session) {
		redirect('/auth/login');
	}

	const customer = await getCustomerById(params.id, session.user.id);

	return (
		<UpsertCustomerForm
			customerId={params.id}
			customer={customer}
		/>
	);
};

export default CustomerEditPage;
