import { deleteProduct } from '@/actions/products';
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
	productId: string;
}
export const DeleteProductAlert: React.FC<Props> = ({ productId }) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button
					type='button'
					data-cy='table-row-action-delete-button'
					className='text-destructive flex gap-1 items-center'
				>
					<Trash />
					Delete
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent data-cy='alert-deleting-product'>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						product.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<form
						className='flex items-center gap-2'
						action={deleteProduct}
					>
						<input
							type='hidden'
							name='productId'
							defaultValue={productId}
						/>
						<AlertDialogCancel
							type='button'
							data-cy='cancel-delete-product-button'
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							type='submit'
							className='bg-destructive'
							data-cy='confirm-delete-product-button'
						>
							Continue
						</AlertDialogAction>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
