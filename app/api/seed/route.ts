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
				name: 'Galletas de chocolate',
				description: 'Galletas de chocolate con chispas de chocolate',
				price: 100,
				tags: ['chocolate', 'galletas', 'reposteria'],
			},
			{
				userId: user.id,
				name: 'Galletas de vainilla',
				description: 'Galletas de vainilla con chispas de chocolate',
				price: 100,
				tags: ['vainilla', 'galletas', 'reposteria'],
			},
			{
				userId: user.id,
				name: 'Galletas de fresa',
				description: 'Galletas de fresa con chispas de chocolate',
				price: 100,
				tags: ['fresa', 'galletas', 'reposteria'],
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
