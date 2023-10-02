'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColumnHeader } from './column-header';
import { Checkbox } from '@/components/ui/checkbox';

import { type Product } from '@prisma/client';
import { TableRowActions } from './table-row-actions';
type ProductData = Pick<
	Product,
	'id' | 'name' | 'price' | 'inStock' | 'tags' | 'description'
>;

export const columns: ColumnDef<ProductData>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
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
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Name'
				/>
			);
		},
		enableHiding: true,
		enableSorting: true,
	},
	{
		accessorKey: 'description',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Description'
				/>
			);
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Price'
				/>
			);
		},
	},
	{
		accessorKey: 'inStock',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='In Stock'
				/>
			);
		},
	},
	{
		accessorKey: 'tags',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Tags'
				/>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <TableRowActions id={row.getValue('id')} />,
	},
];
