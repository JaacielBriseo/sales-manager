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

	await prismadb.$transaction(
		async ({ product, user, customer, orderItem, order, address }) => {
			await orderItem.deleteMany({});
			await order.deleteMany({});
			await product.deleteMany({});
			await address.deleteMany({});
			await customer.deleteMany({});
			await user.deleteMany({});

			const defaultUser = await user.create({ data: seed_users[0]! });
			const defaultProduct = await product.create({
				data: {
					...seed_products[0]!,
					userId: defaultUser.id,
				},
			});

			await product.createMany({
				data: seed_products.slice(1).map((product) => ({
					...product,
					userId: defaultUser.id,
				})),
			});

			const defaultCustomer = await customer.create({
				data: {
					...seed_customers[0]!,
					userId: defaultUser.id,
				},
			});

			await address.create({
				data: {
					...seed_addresses[0]!,
					customerId: defaultCustomer.id,
				},
			});

			await customer.createMany({
				data: seed_customers.slice(1).map((customer) => ({
					...customer,
					userId: defaultUser.id,
				})),
			});

			await order.create({
				data: {
					userId: defaultUser.id,
					customerId: defaultCustomer.id,
					orderItems: {
						create: {
							productId: defaultProduct.id,
							quantity: 1,
						},
					},
					total: 999,
					payedTotal: 500,
					deliveryMethod: 'PICKUP',
					paymentMethod: 'CASH',
				},
			});

			await order.create({
				data: {
					userId: defaultUser.id,
					customerId: defaultCustomer.id,
					orderItems: {
						create: [
							{
								productId: defaultProduct.id,
								quantity: 2,
							},
						],
					},
					total: 999 * 2,
					payedTotal: 999 * 2,
					deliveryMethod: 'DELIVERY',
					paymentMethod: 'TRANSFER',
					status: 'COMPLETED',
					payedAt: new Date(),
					deliveredAt: new Date(),
					deadline: new Date('2023-12-24'),
					deliveryAddress: {
						create: {
							city: 'Hermosillo',
							country: 'Mexico',
							neighborhood: 'Centro',
							postalCode: '83000',
							state: 'Sonora',
							streetName: 'Calle 10',
							streetNumber: '110',
						},
					},
				},
			});
		},
	);

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

const seed_customers = [
	{
		firstName: 'Arturo',
		lastName: 'Briseño',
		phoneNumber: '6441560413',
		email: 'arturo@google.com',
	},
	{
		firstName: 'Isabella',
		lastName: 'Briseño',
		phoneNumber: '6441560414',
		email: 'isabella@google.com',
	},
];

const seed_addresses = [
	{
		streetName: 'Calle 1',
		streetNumber: '1',
		neighborhood: 'Colonia 1',
		city: 'Ciudad 1',
		state: 'Estado 1',
		country: 'País 1',
		postalCode: '85000',
	},
	{
		streetName: 'Calle 2',
		streetNumber: '2',
		neighborhood: 'Colonia 2',
		city: 'Ciudad 2',
		state: 'Estado 2',
		country: 'País 2',
		postalCode: '85000',
	},
];

const seed_products = [
	{
		name: 'Caja de Adviento Disney',
		description:
			'Caja de adviento con temática de Disney, incluye 24 galletas decoradas',
		price: 999,
		tags: ['disney', 'galletas', 'reposteria', 'decoración'],
		inStock: 30,
	},
	{
		name: 'Galleta de chocolate',
		description: 'Galleta gigante de chocolate con chispas de chocolate',
		price: 50,
		tags: ['chocolate', 'galletas', 'reposteria'],
		inStock: 2,
	},
	{
		name: 'Galletas decoradas',
		description:
			'Paquete de 6 galletas decoradas con el tema que el cliente desee',
		price: 150,
		tags: ['decoración', 'galletas', 'reposteria'],
		inStock: 10,
	},
];
