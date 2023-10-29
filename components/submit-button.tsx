'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export const SubmitButton = (props: ButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button
			data-cy='submit-button'
			type='submit'
			aria-disabled={pending}
			{...props}
		>
			{pending ? 'Saving...' : 'Save'}
		</Button>
	);
};
