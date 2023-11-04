'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColumnHeader } from './column-header';
import { Checkbox } from '@/components/ui/checkbox';

import { TableRowActions } from './table-row-actions';
import { currencyFormatter } from '@/lib/utils';
import { formatToDMY } from '@/lib/services/date-fns';

import { type Product } from '@prisma/client';
type ProductData = Pick<
	Product,
	'id' | 'name' | 'price' | 'inStock' | 'tags' | 'shortDescription' | 'createdAt'
>;

export const columns: ColumnDef<ProductData>[] = [
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
		accessorKey:'Created At',
		id:'createdAt',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Created At'
				/>
			);
		},
		cell: ({ row }) => {
			const { createdAt } = row.original;
			return <p className='truncate w-20'>{formatToDMY(createdAt)}</p>;
		},
		enableHiding: true,
		enableSorting: true,
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
		accessorKey: 'shortDescription',
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
		cell: ({ row }) => {
			const { price } = row.original;
			return <p>{currencyFormatter(price)}</p>;
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
		cell: ({ row }) => {
			const { inStock } = row.original;
			return (
				<p>
					<span
						className={`h-3 w-3 rounded-full inline-block mx-1 ${
							inStock <= 4
								? 'bg-destructive'
								: inStock >= 5 && inStock <= 10
								? 'bg-warning'
								: 'bg-success'
						}`}
					/>
					{inStock}{' '}
				</p>
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
		cell: ({ row }) => {
			const { tags } = row.original;
			return (
				<div className='flex flex-wrap gap-1'>
					{tags.map((tag) => (
						<span
							key={tag}
							className='px-2 py-1 text-xs font-bold tracking-wide text-foreground capitalize bg-secondary rounded-full'
						>
							{tag}
						</span>
					))}
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <TableRowActions id={row.getValue('id')} />,
	},
];
