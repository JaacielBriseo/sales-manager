import { deleteCustomer } from '@/actions/customers';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';

interface Props {
	customerId: string;
}
export const DeleteCustomerAlert: React.FC<Props> = ({ customerId }) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button
					type='button'
					data-cy='table-row-action-delete-button'
					className='text-destructive flex gap-1 items-center w-full'
				>
					<Trash />
					Delete
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent data-cy='alert-deleting-customer'>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						customer.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<form
						className='flex items-center gap-2'
						action={deleteCustomer}
					>
						<input
							type='hidden'
							name='customerId'
							defaultValue={customerId}
						/>
						<AlertDialogCancel
							type='button'
							data-cy='cancel-delete-customer-button'
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							type='submit'
							className='bg-destructive'
							data-cy='confirm-delete-customer-button'
						>
							Continue
						</AlertDialogAction>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
