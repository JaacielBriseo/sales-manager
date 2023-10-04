import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

import prismadb from '@/lib/prisma';
import { bcryptUtils } from '@/lib/services/bcrypt';

export async function POST(_: Request) {
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json(
			{
				message: 'Cannot seed in production',
			},
			{ status: 400 },
		);
	}

	await prismadb.product.deleteMany({});
	await prismadb.user.deleteMany({});

	const user = await prismadb.user.create({ data: seed_users[0]! });

	await prismadb.product.createMany({
		data: [
			{
				userId: user.id,
				name: 'Galleta de chocolate',
				description: 'Galleta gigante de chocolate con chispas de chocolate',
				price: 50,
				tags: ['chocolate', 'galletas', 'reposteria'],
				inStock: 2,
			},
			{
				userId: user.id,
				name: 'Galletas decoradas',
				description:
					'Paquete de 6 galletas decoradas con el tema que el cliente desee',
				price: 150,
				tags: ['decoración', 'galletas', 'reposteria'],
				inStock: 10,
			},
			{
				userId: user.id,
				name: 'Caja de Adviento Disney',
				description:
					'Caja de adviento con temática de Disney, incluye 24 galletas decoradas',
				price: 999,
				tags: ['disney', 'galletas', 'reposteria', 'decoración'],
				inStock: 30,
				
			},
		],
	});

	return NextResponse.json(
		{
			message: 'Seed Success',
		},
		{ status: 200 },
	);
}

const seed_users: Prisma.UserCreateInput[] = [
	{
		email: 'jaaciel@google.com',
		firstName: 'Jaaciel',
		lastName: 'Briseño',
		phoneNumber: '6441560412',
		password: bcryptUtils.hash('Abc123456'),
	},
];
