'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColumnHeader } from './column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { TableRowActions } from './table-row-actions';

import { currencyFormatter, cn } from '@/lib/utils';
import { formatToDMY } from '@/lib/services/date-fns';

import { type OrderStatus } from '@prisma/client';

interface Props {
	id: string;
	customerName: string;
	status: OrderStatus;
	total: number;
	payedTotal: number;
	deadline: Date | null
	deliveredAt: Date | null
	items: {
		productId: string;
		productName: string;
		quantity: number;
	}[];
}

export const columns: ColumnDef<Props>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
				data-cy='select-all-rows-checkbox'
				className='translate-y-[2px]'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
				className='translate-y-[2px]'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='ID'
				/>
			);
		},
		cell: ({ row }) => {
			const { id } = row.original;
			return <p className='truncate w-20'>{id}</p>;
		},
	},
	{
		accessorKey: 'customerName',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Customer'
				/>
			);
		},
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Status'
				/>
			);
		},
		cell: ({ row }) => {
			const { status } = row.original;
			return (
				<div className='flex items-center space-x-1'>
					<p className='capitalize'>{status.toLowerCase()}</p>
					<span
						className={cn('inline-block h-3 w-3 rounded-full', {
							'bg-warning': status === 'PENDING',
							'bg-success': status === 'COMPLETED',
							'bg-destructive': status === 'CANCELLED',
						})}
					/>
				</div>
			);
		},
		filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
	},
	{
		accessorKey: 'total',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Total'
				/>
			);
		},
		cell: ({ row }) => {
			const { total } = row.original;
			return <p>{currencyFormatter(total)}</p>;
		},
	},

	{
		accessorKey: 'payedTotal',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Payed'
				/>
			);
		},
		cell: ({ row }) => {
			const { payedTotal } = row.original;
			return <p>{currencyFormatter(payedTotal)}</p>;
		},
	},
	{
		accessorKey: 'deadline',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Deadline'
				/>
			);
		},
		cell: ({ row }) => {
			const { deadline } = row.original;
			if (!deadline) return <p>None</p>;
			return <p>{formatToDMY(deadline)}</p>;
		},
	},
	{
		accessorKey: 'deliveredAt',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Delivered date'
				/>
			);
		},
		cell: ({ row }) => {
			const { deliveredAt } = row.original;
			if (!deliveredAt)
				return (
					<div className='flex items-center gap-x-1'>
						<p>This order is not delivered yet</p>
						<span className='inline-block h-3 w-3 rounded-full bg-destructive animate-pulse' />
					</div>
				);
			return <p>{formatToDMY(deliveredAt)}</p>;
		},
	},
	{
		accessorKey: 'orderItems',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Items'
				/>
			);
		},
		cell: ({ row }) => {
			const { items } = row.original;
			return (
				<ul className='list-inside list-disc'>
					{items.map((item) => (
						<li key={item.productId}>
							{item.productName} x{item.quantity}
						</li>
					))}
				</ul>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <TableRowActions id={row.getValue('id')} />,
	},
];
