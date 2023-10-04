'use client';
// @ts-ignore - TODO wait for updates to avoid the typescript error
import { experimental_useFormState as useFormState } from 'react-dom';
import Link from 'next/link';

import { Table } from '@tanstack/react-table';
import { PlusCircle, X } from 'lucide-react';

import { deleteManyProducts } from '@/actions/products';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TableViewOptions } from './table-view-options';

interface TableToolbarProps<TData> {
	table: Table<TData>;
	filterKey: string;
}

export function TableToolbar<TData>({
	table,
	filterKey,
}: TableToolbarProps<TData>) {
	const [_, formAction] = useFormState(deleteManyProducts, {
		message: null,
	});
	const isFiltered = table.getState().columnFilters.length > 0;
	const selectedIds: string[] = table
		.getFilteredSelectedRowModel()
		// @ts-expect-error
		.rows.map((row) => row.original.id);

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder={`Filter by ${filterKey}...`}
					value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn(filterKey)?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{isFiltered && (
					<Button
						variant='ghost'
						onClick={() => table.resetColumnFilters()}
						className='h-8 px-2 lg:px-3'
					>
						Reset
						<X className='ml-2 h-4 w-4' />
					</Button>
				)}
				{selectedIds.length > 0 && (
					<form action={formAction}>
						<input
							type='hidden'
							name='productIds'
							value={selectedIds.join(',')}
						/>
						<Button
							variant='destructive'
							className='h-8 px-2 lg:px-3'
							type='submit'
						>
							Delete selected rows
							<X className='ml-2 h-4 w-4' />
						</Button>
					</form>
				)}
			</div>
			<div className='flex items-center space-x-2'>
				<TableViewOptions table={table} />
				<Button
					asChild
					className='h-8 px-2 lg:px-3'
				>
					<Link href='/dashboard/products/new'>
						Add new
						<PlusCircle className='ml-2 h-4 w-4' />
					</Link>
				</Button>
			</div>
		</div>
	);
}
