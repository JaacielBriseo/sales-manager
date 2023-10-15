'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColumnHeader } from './column-header';

import { TableRowActions } from './table-row-actions';
import { currencyFormatter } from '@/lib/utils';

interface Props {
	id: string;
	productName: string;
	unitProductPrice: number;
	quantity: number;
	productId: string;
}

export const orderItemsColumns: ColumnDef<Props>[] = [
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
		accessorKey: 'productName',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Product Name'
				/>
			);
		},
		cell: ({ row }) => {
			const { productName } = row.original;
			return <p>{productName}</p>;
		},
	},
	{
		accessorKey: 'unitProductPrice',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Unit Price'
				/>
			);
		},
		cell: ({ row }) => {
			const { unitProductPrice } = row.original;
			return <p>{currencyFormatter(unitProductPrice)}</p>;
		},
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Quantity'
				/>
			);
		},
		cell: ({ row }) => {
			const { quantity } = row.original;
			return <p>x{quantity}</p>;
		},
	},

	{
		id: 'actions',
		cell: ({ row }) => <TableRowActions id={row.original.productId} />,
	},
];
