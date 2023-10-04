import Link from 'next/link';
import { FileEdit, MoreHorizontal } from 'lucide-react';

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
			<DropdownMenuTrigger asChild>
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
						href={`/dashboard/products/${id}`}
						className='flex items-center gap-1'
					>
						<FileEdit />
						Edit
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<DeleteProductAlert productId={id} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
