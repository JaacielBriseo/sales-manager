'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

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
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className='flex items-center'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder={`Filter by product name`}
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
			</div>
			<div className='flex items-center space-x-2'>
				<TableViewOptions table={table} />
			</div>
		</div>
	);
}
