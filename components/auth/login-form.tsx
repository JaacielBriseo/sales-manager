'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { isErrorInstance } from '@/lib/type-guards';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/),
});

export const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			const response = await signIn('credentials', {
				...values,
				redirect: false,
			});

			if (!response) {
				throw new Error('Something went wrong');
			}

			if (response.ok) {
				toast({
					title: 'Success!',
					description: 'You have successfully logged in.',
					variant: 'success',
				});
				router.refresh();
				router.push('/dashboard');
			}

			if (response.error) {
				throw new Error(response.error);
			}
		} catch (error) {
			const errorMsg = isErrorInstance(error)
				? error.message
				: 'Something went wrong';

			console.log(
				'%c [Login-Form]',
				'background-color:red; color:white; ',
				error,
			);
			toast({
				title: 'Oops! Something went wrong.',
				description: errorMsg,
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className='w-[375px] md:w-[450px]'>
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>Sign in to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											data-cy='email-input'
											placeholder='youremail@google.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											data-cy='password-input'
											type='password'
											placeholder='********'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='w-full'
							disabled={isLoading}
						>
							Sign In
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
