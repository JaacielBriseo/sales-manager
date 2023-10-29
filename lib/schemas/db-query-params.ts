import z from 'zod';
import { paginationConstants } from '../constants';

export const dbQueryParamsSchema = z.object({
	page: z.coerce.number().default(paginationConstants.page),
	perPage: z.coerce.number().default(paginationConstants.perPage),
	query: z.string().optional(),
});
