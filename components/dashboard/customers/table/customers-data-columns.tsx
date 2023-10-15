'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColumnHeader } from './column-header';

import { TableRowActions } from './table-row-actions';
import { cn, currencyFormatter } from '@/lib/utils';
import { type OrderStatus } from '@prisma/client';
import { formatToDMY } from '@/lib/services/date-fns';

interface TableData {
	id: string;
	status: OrderStatus;
	payedTotal: number;
	total: number;
	createdAt: Date | null;
	payedAt: Date | null
	deliveredAt: Date | null;
}

export const customerOrdersDataColumns: ColumnDef<TableData>[] = [
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
			return <p className='truncate max-w-[4rem]'>{id}</p>;
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
				<p>
					{status}{' '}
					<span
						className={cn('inline-block h-3 w-3 rounded-full', {
							'bg-warning': status === 'PENDING',
							'bg-success': status === 'COMPLETED',
							'bg-destructive': status === 'CANCELLED',
						})}
					/>
				</p>
			);
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
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Ordered At'
				/>
			);
		},
		cell: ({ row }) => {
			const { createdAt } = row.original;
			if (!createdAt) {
				return <p>---</p>;
			}
			return <p>{formatToDMY(createdAt)}</p>;
		},
	},
	{
		accessorKey: 'deliveredAt',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Delivered At'
				/>
			);
		},
		cell: ({ row }) => {
			const { deliveredAt } = row.original;
			if (!deliveredAt) {
				return <p>This order has not been delivered</p>;
			}
			return <p>{formatToDMY(deliveredAt)}</p>;
		},
	},
	{
		accessorKey: 'payedAt',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Totally payed at'
				/>
			);
		},
		cell: ({ row }) => {
			const { payedAt } = row.original;
			if (!payedAt) {
				return <p>This order has not been totally payed</p>;
			}
			return <p>{formatToDMY(payedAt)}</p>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <TableRowActions id={row.getValue('id')} />,
	},
];
