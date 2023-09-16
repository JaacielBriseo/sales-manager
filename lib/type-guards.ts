export const isErrorInstance = (error: any): error is Error => {
	return error instanceof Error;
};
