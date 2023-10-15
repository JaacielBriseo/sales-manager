'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColumnHeader } from './column-header';
import { Checkbox } from '@/components/ui/checkbox';

import { TableRowActions } from './table-row-actions';
import { formatToDMY } from '@/lib/services/date-fns';

import { type Customer } from '@prisma/client';
type CustomerData = Pick<
	Customer,
	'id' | 'firstName' | 'lastName' | 'phoneNumber' | 'createdAt' | 'email'
> & { address: string };

export const columns: ColumnDef<CustomerData>[] = [
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
		accessorKey: 'Created At',
		id: 'createdAt',
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
		accessorKey: 'firstName',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='First Name'
				/>
			);
		},
		enableHiding: true,
		enableSorting: true,
	},
	{
		accessorKey: 'lastName',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Last Name'
				/>
			);
		},
		enableHiding: true,
		enableSorting: true,
	},
	{
		accessorKey: 'phoneNumber',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Phone Number'
				/>
			);
		},
		enableHiding: true,
		enableSorting: true,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Email'
				/>
			);
		},
		enableHiding: true,
		enableSorting: true,
	},
	{
		accessorKey: 'address',
		header: ({ column }) => {
			return (
				<ColumnHeader
					column={column}
					title='Address'
				/>
			);
		},
		enableHiding: true,
		enableSorting: true,
	},
	{
		id: 'actions',
		cell: ({ row }) => <TableRowActions id={row.getValue('id')} />,
	},
];
