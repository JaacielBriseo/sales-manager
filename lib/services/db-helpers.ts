'use server';

import prismadb from '../prisma';
import { PrismaClient } from '@prisma/client';
import { paginationConstants } from '../constants';

type ModelsWithFindMany = {
	[K in keyof PrismaClient]: PrismaClient[K] extends {
		findMany(args: any): any;
	}
		? K
		: never;
}[keyof PrismaClient];

type FindManyArgs<T extends ModelsWithFindMany> = Parameters<
	PrismaClient[T]['findMany']
>[0];

interface Pagination {
	page: number;
	perPage: number;
}

type ExtractSelectField<T> = T extends { select: infer S } ? S : never;
export const getPaginatedData = async <
	T extends ModelsWithFindMany,
	U extends FindManyArgs<T>,
>(
	modelName: T,
	findManyArgs: U,
	pagination?: Pagination,
) => {
	const { page, perPage } = pagination || paginationConstants;

	const skip = (page - 1) * perPage;
	const take = perPage;

	type SelectField = ExtractSelectField<U>;
	type ReturnTypeWithoutSelect = ReturnType<PrismaClient[T]['findMany']>;

	type ResolvedReturnTypeWithoutSelect =
		ReturnTypeWithoutSelect extends Promise<Array<infer R>> ? R : never;

	type ReturnTypeWithSelect = SelectField extends undefined
		? ResolvedReturnTypeWithoutSelect
		: {
				[K in keyof SelectField]: SelectField[K] extends true
					? K extends keyof ResolvedReturnTypeWithoutSelect
						? ResolvedReturnTypeWithoutSelect[K]
						: never
					: never;
		  };

	// @ts-expect-error
	const count = prismadb[modelName].count({
		where: findManyArgs?.where,
	});

	const findMany = prismadb[modelName].findMany as (
		args: U & { skip: number; take: number },
	) => Promise<Array<ReturnTypeWithSelect>>;

	return await Promise.all([
		findMany({
			...findManyArgs,
			skip,
			take,
		}),
		count,
	]);
};
