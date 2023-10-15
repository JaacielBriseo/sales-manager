import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

import { type Address } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const currencyFormatter = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
};

type AddressArg = Omit<
	Address,
	'id' | 'createdAt' | 'customerId' | 'isActive' | 'userId' | 'updatedAt'
>;
export const formatAddress = (address: AddressArg) => {
	const {
		country,
		state,
		city,
		postalCode,
		neighborhood,
		streetName,
		streetNumber,
	} = address;

	return `${streetName} #${streetNumber}, ${neighborhood}, ${city} ${postalCode}, ${state}, ${country}`;
};
