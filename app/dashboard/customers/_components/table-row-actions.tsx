import Link from 'next/link';
import { FileSearch, MoreHorizontal } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DeleteCustomerAlert } from '@/components/dashboard/customers/delete-customer-alert';

interface Props {
	id: string;
}

export function TableRowActions({ id }: Props) {
	return (
		<DropdownMenu modal={false}>
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
						href={`/dashboard/customers/${id}`}
						className='flex items-center gap-1 w-full'
					>
						<FileSearch />
						Details
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<DeleteCustomerAlert customerId={id} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
