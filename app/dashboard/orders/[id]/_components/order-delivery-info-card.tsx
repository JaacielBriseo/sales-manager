import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
	deliveryMethod: string;
	deliveryAddress?: string;
	deliveredAt?: string;
	deadline?: string;
}

export const OrderDeliveryInfoCard: React.FC<Props> = ({
	deliveryMethod,
	deliveredAt,
	deliveryAddress,
	deadline,
}) => {
	return (
		<Card className='p-5 space-y-5'>
			<CardHeader className='flex flex-row items-center justify-between gap-3 p-0'>
				<CardTitle>Delivery Information</CardTitle>
				{deliveredAt ? (
					<CheckCircle className='text-success h-7 w-7' />
				) : (
					<AlertCircle className='text-warning h-7 w-7' />
				)}
			</CardHeader>
			<CardContent className='p-0'>
				<div>
					{deadline ? (
						<p>
							Order must be delivered before{' '}
							{deadline}
						</p>
					) : (
						<p>The customer did not specify a date for delivery</p>
					)}
					<p>
						{deliveredAt
							? `Order delivered at ${deliveredAt}`
							: 'Order not delivered yet'}
					</p>
					<p>
						Delivery method:{' '}
						<span className='capitalize'>{deliveryMethod.toLowerCase()}</span>
					</p>
					{deliveryAddress && <p>Delivery address: {deliveryAddress}</p>}
				</div>
			</CardContent>
		</Card>
	);
};
