import Link from 'next/link';
import { FileEdit, FileSearch, MoreHorizontal } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DeleteProductAlert } from '@/components/dashboard/products/delete-product-alert';

interface Props {
	id: string;
}

export function TableRowActions({ id }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				data-cy='table-row-actions-button'
				asChild
			>
				<Button
					variant='ghost'
					className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
				>
					<MoreHorizontal className='h-4 w-4' />
					<span className='sr-only'>Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-[160px]'
			>
				<DropdownMenuItem>
					<Link
						data-cy='table-row-action-edit-link'
						href={`/dashboard/orders/${id}/edit`}
						className='flex items-center gap-1 w-full'
					>
						<div className='flex items-center gap-1'>
							<FileEdit />
							Edit
						</div>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link
						data-cy='table-row-action-edit-link'
						href={`/dashboard/orders/${id}`}
						className='flex items-center gap-1 w-full'
					>
						<div className='flex items-center gap-1'>
							<FileSearch />
							Details
						</div>
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
