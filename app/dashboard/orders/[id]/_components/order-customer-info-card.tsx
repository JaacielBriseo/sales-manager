import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface Props {
	id: string;
	fullName: string;
	phoneNumber: string;
}

export const OrderCustomerInfoCard: React.FC<Props> = (props) => {
	const { fullName, phoneNumber, id } = props;
	return (
		<Card className='p-5 space-y-5'>
			<CardHeader className='flex-row items-center gap-3 p-0'>
				<CardTitle>Customer Information</CardTitle>
			</CardHeader>
			<CardContent className='p-0'>
				<ul>
					<li>
						<p>Name : {fullName}</p>
					</li>
					<li>
						<p>Phone number : {phoneNumber}</p>
					</li>
				</ul>
			</CardContent>
			<CardFooter className='p-0'>
				<Button
					variant='secondary'
					size='sm'
					asChild
					className='mt-0'
				>
					<Link href={`/dashboard/customers/${id}`}>
						<p className='font-medium'>View customer in detail</p>
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};
