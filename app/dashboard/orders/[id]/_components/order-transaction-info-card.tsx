import { currencyFormatter } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
	paymentMethod: string;
	total: number;
	payedAt?: string;
	payedTotal: number;
}

export const OrderTransactionInfoCard: React.FC<Props> = ({
	paymentMethod,
	payedAt,
	payedTotal,
	total,
}) => {
	return (
		<Card className='p-5 space-y-5'>
			<CardHeader className='flex flex-row items-center justify-between gap-3 p-0'>
				<CardTitle>Transaction Information</CardTitle>
				{payedAt ? (
					<CheckCircle className='text-success h-7 w-7' />
				) : (
					<AlertCircle className='text-warning h-7 w-7' />
				)}
			</CardHeader>
			<CardContent className='p-0'>
				<div>
					<p>{payedAt ? `Order payed at ${payedAt}` : 'Order not payed yet'}</p>
					<p>
						Payment method:{' '}
						<span className='capitalize'>{paymentMethod.toLowerCase()}</span>
					</p>
					<p>Payed total: {currencyFormatter(payedTotal)}</p>
					<p>Total: {currencyFormatter(total)}</p>
				</div>
			</CardContent>
		</Card>
	);
};
