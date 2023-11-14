import prismadb from '@/lib/prisma';
import { paginationConstants } from '@/lib/constants';

// Types
import { type Prisma, type PrismaClient } from '@prisma/client';
type DbModelsWithFindMany = {
	[K in keyof PrismaClient]: PrismaClient[K] extends {
		findMany(args: any): any;
	}
		? K
		: never;
}[keyof PrismaClient];

type DbArgs<T extends DbModelsWithFindMany> = Prisma.Args<
	(typeof prismadb)[T],
	'findMany'
>;

interface DbSelectAndWhere<T extends DbModelsWithFindMany> {
	select?: Prisma.Args<(typeof prismadb)[T], 'findMany'>['select'];
	where?: Prisma.Args<(typeof prismadb)[T], 'findMany'>['where'];
}

interface PaginatedQueryArgs<T extends DbModelsWithFindMany> extends DbSelectAndWhere<T> {
	pagination?: {
		page: number;
		perPage: number;
	};
}

type DbFindManyResult<
	T extends DbModelsWithFindMany,
	U extends DbSelectAndWhere<T>,
> = Prisma.Result<(typeof prismadb)[T], U, 'findMany'>;

// Function

/**
 * @param modelName - The name of the model to query
 * @param args - The arguments to pass to the query
 * @returns Promise[typeof args.select, number] - Tuple containing the data and the count of the query
 * based on the select argument
 * @example
 * const [data, count] = await getPaginatedData('user', {
 * 	select: {
 * 		id: true,
 * 		customers: {
 * 			select: {
 * 				firstName: true,
 * 			},
 * 		},
 * 	},
 * });
 * console.log(data);
 * console.log(count);
 * 
 */
export const getPaginatedData = async <
	T extends DbModelsWithFindMany,
	U extends PaginatedQueryArgs<T>,
>(
	modelName: T,
	args: U,
): Promise<[DbFindManyResult<T, U>, number]> => {
	// Destructure args
	const { pagination, select, where } = args;

	// Pagination
	const { page, perPage } = pagination || paginationConstants;
	const skip = (page - 1) * perPage;
	const take = perPage;

	// DB Model
	const dbModel: PrismaClient[T] = prismadb[modelName];

	// Db Functions
	const findMany = dbModel.findMany as (args: {
		select?: typeof select;
		where?: typeof where;
		skip?: number;
		take?: number;
	}) => Promise<DbFindManyResult<T, U>>;

	// TODO: Fix this type
	// @ts-expect-error
	const count = dbModel.count({
		where: args?.where,
	});

	return await Promise.all([
		findMany({ select, where, skip, take }),
		count,
	]);
};

// Usage
const test = async () => {
	const [data, count] = await getPaginatedData('user', {
		select: {
			id: true,
			customers: {
				select: {
					firstName: true,
				},
			},
		},
	});
	console.log(data);
};
