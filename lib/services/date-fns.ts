import { format } from 'date-fns';

// format to day/month/year
export const formatToDMY = (date: Date) => {
	return format(date, 'dd/MM/yyyy');
};
