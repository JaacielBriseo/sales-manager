'use client';
import Link from 'next/link';

import { Table } from '@tanstack/react-table';
import {
	AlertCircle,
	Check,
	CheckCircle,
	LucideIcon,
	PlusCircle,
	X,
	XOctagon,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TableViewOptions } from './table-view-options';
import { TableFacetedFilter } from './table-faceted-filter';
import { OrderStatus } from '@prisma/client';

interface TableToolbarProps<TData> {
	table: Table<TData>;
	filterKey: string;
}

interface Status {
	value: OrderStatus;
	label: string;
	icon: LucideIcon;
}

const statuses: Status[] = [
	{
		value: 'COMPLETED',
		label: 'Completed',
		icon: CheckCircle,
	},
	{
		value: 'PENDING',
		label: 'Pending',
		icon: AlertCircle,
	},
	{
		value: 'CANCELLED',
		label: 'Cancelled',
		icon: XOctagon,
	},
];
export function TableToolbar<TData>({
	table,
	filterKey,
}: TableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder={`Filter by name...`}
					value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn(filterKey)?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{table.getColumn('status') && (
					<TableFacetedFilter
						column={table.getColumn('status')}
						title='Status'
						options={statuses}
					/>
				)}
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
				<Button
					asChild
					className='h-8 px-2 lg:px-3'
				>
					<Link
						data-cy='add-new-product'
						href='/dashboard/orders/create'
					>
						Create order
						<PlusCircle className='ml-2 h-4 w-4' />
					</Link>
				</Button>
			</div>
		</div>
	);
}
