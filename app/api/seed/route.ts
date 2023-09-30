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
			{ status: 400 }
		);
	}

	await prismadb.user.deleteMany({});
	await prismadb.user.createMany({ data: seed_users });

	return NextResponse.json(
		{
			message: 'Seed Success',
		},
		{ status: 200 }
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