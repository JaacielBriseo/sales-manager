'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { isErrorInstance } from '@/lib/type-guards';
import { productSchema } from '@/lib/schemas/products';
import { upsertProductAction } from '@/actions/products';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { SubmitButton } from '@/components/submit-button';

interface Props {
	product: {
		id?: string;
		name?: string;
		price?: number;
		inStock?: number;
		tags?: string[];
		description?: string;
	} | null;
}
export const UpsertProductForm = ({ product }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const { toast } = useToast();

	const onSubmit = async (data: z.infer<typeof productSchema>) => {
		try {
			const { error, message } = await upsertProductAction({
				productId: product?.id,
				data,
			});

			if (error) {
				throw new Error(error);
			}

			toast({
				variant: 'success',
				title: 'Success',
				description: message,
			});

			router.push(searchParams.get('from') ?? '/dashboard/products');
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: isErrorInstance(error)
					? error.message
					: 'Something went wrong',
			});
		}
	};

	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			description: product?.description ?? '',
			inStock: product?.inStock ?? 0,
			name: product?.name ?? '',
			price: product?.price ?? 100,
			tags: product?.tags?.join(', ') ?? '',
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col md:grid md:grid-cols-2 gap-6'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Chocolate cake'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<div className='relative before:absolute before:content-["$"] before:top-[25%] before:ml-1 before:text-sm before:flex before:items-center'>
									<Input
										type='number'
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='inStock'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Stock</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='tags'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tags</FormLabel>
							<FormControl>
								<Input
									placeholder='chocolate, bakery, sweet'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='md:col-span-2'>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Biscuit cake with chocolate topping'
									rows={7}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SubmitButton className='w-1/2 text-lg self-end md:col-span-2 md:justify-self-end' />
			</form>
		</Form>
	);
};
