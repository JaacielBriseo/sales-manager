import Link from 'next/link';
import { MoreHorizontal, TableProperties } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

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
				<Link
					data-cy='table-row-action-details-link'
					href={`/dashboard/orders/${id}`}
				>
					<DropdownMenuItem className='cursor-pointer'>
						<div className='flex items-center gap-x-1'>
							<TableProperties />
							<p>Details</p>
						</div>
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
