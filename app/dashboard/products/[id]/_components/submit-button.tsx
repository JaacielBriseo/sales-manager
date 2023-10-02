'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			aria-disabled={pending}
		>
			{pending ? 'Saving...' : 'Save'}
		</Button>
	);
};
