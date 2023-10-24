import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import prismadb from '@/lib/prisma';
import { getUserSession } from '@/lib/user-session';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createOrderAction } from '@/actions/orders';
import { CreateOrderForm } from './_components/create-order-form';

const DashboardOrdersCreatePage = async () => {
	const session = await getUserSession();

	if (!session) {
		redirect('/auth/login');
	}
	const customers = await prismadb.customer.findMany({
		where: {
			userId: session.user.id,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
		},
	});

	const products = await prismadb.product.findMany({
		where: {
			userId: session.user.id,
		},
		select: {
			id: true,
			name: true,
			price: true,
		},
	});
	return (
		<div className='flex flex-col gap-7'>
			<h1 className='text-2xl font-bold'>Create new order</h1>
			<CreateOrderForm
				customers={customers}
				products={products}
			/>
		</div>
	);
};

export default DashboardOrdersCreatePage;
