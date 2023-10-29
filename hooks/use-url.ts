import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useUrl = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			for (const [key, value] of Object.entries(params)) {
				if (value === null) {
					newSearchParams.delete(key);
				} else {
					newSearchParams.set(key, String(value));
				}
			}

			return newSearchParams.toString();
		},
		[searchParams],
	);

	/**
	 * Pushes or removes search params from the URL
	 * If the value is null, it will remove the param from the URL
	 * @example pushQueries({ page: 2, query: 'test' }) => ...pathname?page=2&query=test
	 * @example pushQueries({ page: 2, query: null }) => ...pathname?page=2
	 */
	const pushQueries = useCallback(
		(params: Record<string, string | number | null>) => {
			router.push(`${pathname}?${createQueryString(params)}`);
		},
		[createQueryString, pathname, router],
	);

	return {
		createQueryString,
		pushQueries,
	};
};
