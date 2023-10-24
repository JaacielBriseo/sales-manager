import prismadb from '@/lib/prisma';
import { OrderCustomerInfoCard } from './_components/order-customer-info-card';
import { notFound } from 'next/navigation';
import { cn, formatAddress } from '@/lib/utils';
import { formatToDMY } from '@/lib/services/date-fns';
import { OrderItemsDataTable } from './_components/order-items-table/order-items-data-table';
import { orderItemsColumns } from './_components/order-items-table/order-items-columns';
import { OrderDeliveryInfoCard } from './_components/order-delivery-info-card';
import { OrderTransactionInfoCard } from './_components/order-transaction-info-card';

interface Props {
	params: { id: string };
}

const getOrderById = async (id: string) => {
	if (!id || id === 'new') {
		return null;
	}
	return await prismadb.order.findUnique({
		where: {
			id,
		},
		include: {
			customer: {
				include: {
					address: true,
				},
			},
			orderItems: {
				include: {
					product: true,
				},
			},
			deliveryAddress: true,
		},
	});
};

const DashboardOrderByIdPage: React.FC<Props> = async ({ params }) => {
	const order = await getOrderById(params.id);

	if (!order) {
		notFound();
	}
	const {
		customer,
		orderItems,
		deadline,
		deliveredAt,
		deliveryMethod,
		payedAt,
		payedTotal,
		paymentMethod,
		status,
		total,
		id: orderId,
		deliveryAddress,
		note,
	} = order;
	const { firstName, lastName, phoneNumber, id: customerId } = customer;

	const formattedOrderItems = orderItems.map((orderItem) => ({
		id: orderItem.id,
		productName: orderItem.product.name,
		unitProductPrice: orderItem.product.price,
		quantity: orderItem.quantity,
		productId: orderItem.productId,
	}));

	const deliveryInformation = {
		deliveryMethod,
		deadline: deadline ? formatToDMY(deadline) : undefined,
		deliveryAddress: deliveryAddress
			? formatAddress(deliveryAddress)
			: undefined,
		deliveredAt: deliveredAt ? formatToDMY(deliveredAt) : undefined,
		note: note || undefined,
	};

	const transactionInformation = {
		paymentMethod,
		payedAt: payedAt ? formatToDMY(payedAt) : undefined,
		payedTotal,
		total,
	};

	const customerInformation = {
		fullName: `${firstName} ${lastName}`,
		id: customerId,
		phoneNumber,
	};
	return (
		<div className='flex flex-col gap-5'>
			<div className='flex items-center gap-x-1'>
				<h1 className='text-3xl font-bold'>Order #{orderId} </h1>
				<span
					className={cn('inline-block w-5 h-5 rounded-full', {
						'bg-success animate-bounce repeat-[5]': status === 'COMPLETED',
						'bg-warning animate-pulse repeat-[5]': status === 'PENDING',
						'bg-destructive animate-pulse repeat-[5]': status === 'CANCELLED',
					})}
				/>
			</div>
			<section className='grid grid-cols-3 gap-5'>
				<OrderTransactionInfoCard {...transactionInformation} />
				<OrderDeliveryInfoCard {...deliveryInformation} />
				<OrderCustomerInfoCard {...customerInformation} />
			</section>
			<section>
				<h3>
					Order Items{' '}
					<span className='text-sm text-gray-400'>
						({order.orderItems.length})
					</span>
				</h3>
				<OrderItemsDataTable
					columns={orderItemsColumns}
					data={formattedOrderItems}
				/>
			</section>
		</div>
	);
};

export default DashboardOrderByIdPage;
