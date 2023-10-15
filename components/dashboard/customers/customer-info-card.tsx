import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
	id: string;
	fullName: string;
	email: string | null;
	phoneNumber: string;
	createdAt: string;
	address: string;
}

export const CustomerInfoCard: React.FC<Props> = (props) => {
	const { address, createdAt, email, fullName, phoneNumber, id } = props;
	return (
		<Card className='p-5'>
			<CardHeader className='flex-row items-center gap-3 p-0'>
				<CardTitle>{fullName}</CardTitle>
				<Button
					variant='secondary'
					size='sm'
					asChild
					className='mt-0'
				>
					<Link href={`/dashboard/customers/${id}/edit`}>
						<p className='font-medium'>Edit</p>
					</Link>
				</Button>
			</CardHeader>
			<CardContent className='p-0'>
				<p>
					Registrado el {createdAt}
				</p>
				{email && <p>{email}</p>}
				<p>{phoneNumber}</p>
				<p>{address}</p>
			</CardContent>
		</Card>
	);
};
