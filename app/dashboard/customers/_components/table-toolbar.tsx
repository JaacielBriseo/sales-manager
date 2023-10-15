'use client';
import Link from 'next/link';

import { Table } from '@tanstack/react-table';
import { PlusCircle, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TableViewOptions } from './table-view-options';
import { DeleteAllProductsAlert } from '@/components/dashboard/products/delete-all-products-alert';

interface TableToolbarProps<TData> {
	table: Table<TData>;
	filterKey: string;
}

export function TableToolbar<TData>({
	table,
	filterKey,
}: TableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	const selectedIds: string[] = table
		.getFilteredSelectedRowModel()
		// @ts-expect-error
		.rows.map((row) => row.original.id);

		const camelCaseToTitleCase = (str: string) => {
			return str
				.replace(/([A-Z])/g, ' $1')
				.replace(/^./, (str) => str.toUpperCase());
		};

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder={`Filter by ${camelCaseToTitleCase(filterKey)}...`}
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
					<DeleteAllProductsAlert selectedIds={selectedIds} />
				)}
			</div>
			<div className='flex items-center space-x-2'>
				<TableViewOptions table={table} />
				<Button
					asChild
					className='h-8 px-2 lg:px-3'
				>
					<Link
						data-cy='register-new-customer'
						href='/dashboard/customers/register'
					>
						Register
						<PlusCircle className='ml-2 h-4 w-4' />
					</Link>
				</Button>
			</div>
		</div>
	);
}
