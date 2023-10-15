import { X } from 'lucide-react';
import { deleteManyProducts } from '@/actions/products';
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
import { Button } from '@/components/ui/button';

interface Props {
	selectedIds: string[];
}

export const DeleteAllProductsAlert: React.FC<Props> = ({ selectedIds }) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='destructive'
					className='h-8 px-2 lg:px-3'
					type='button'
					data-cy='delete-all-products-alert-trigger'
				>
					Delete selected rows
					<X className='ml-2 h-4 w-4' />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent data-cy='alert-delete-all-products'>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						product.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<form action={deleteManyProducts}>
						<input
							type='hidden'
							name='productIds'
							defaultValue={selectedIds.join(',')}
						/>
						<AlertDialogCancel
							type='button'
							data-cy='cancel-delete-all-products-button'
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							type='submit'
							className='bg-destructive'
							data-cy='confirm-delete-all-products-button'
						>
							Continue
						</AlertDialogAction>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
