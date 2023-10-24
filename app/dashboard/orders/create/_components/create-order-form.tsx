'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	paymentMethodsTuple,
	deliveryMethodsTuple,
	orderStatusTuple,
} from '@/lib/constants';

import Image from 'next/image';
import { cn, currencyFormatter } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, CheckIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { CreateOrderFormValues, createOrderSchema } from '@/lib/schemas/order';
import { useToast } from '@/components/ui/use-toast';
import { createOrderAction } from '@/actions/orders';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

const defaultValues: Partial<CreateOrderFormValues> = {
	isNewCustomer: false,
	customerId: undefined,
	paymentMethod: undefined,
	deliveryMethod: undefined,
	orderStatus: 'PENDING',
	deadline: undefined,
	note: undefined,
	orderItems: [],
};
interface Props {
	customers: {
		id: string;
		firstName: string;
		lastName: string;
	}[];
	products: {
		id: string;
		name: string;
		price: number;
	}[];
}
export const CreateOrderForm: React.FC<Props> = ({ customers, products }) => {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<CreateOrderFormValues>({
		resolver: zodResolver(createOrderSchema),
		defaultValues,
	});

	const {
		append: appendOrderItem,
		remove: removeOrderItem,
		update: updateOrderItem,
	} = useFieldArray({
		control: form.control,
		name: 'orderItems',
	});

	const orderItems = useWatch({
		control: form.control,
		name: 'orderItems',
	});

	const isNewCustomer = useWatch({
		control: form.control,
		name: 'isNewCustomer',
	});

	const onSubmit = async (values: CreateOrderFormValues) => {
		try {
			await createOrderAction(values);
			toast({
				variant: 'success',
				title: 'Success',
				description: 'Order created successfully.',
			});
			router.push('/dashboard/orders');
		} catch (error) {
			console.log(error);
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Something went wrong. Please try again later.',
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid grid-cols-2 gap-11 py-3'
			>
				{/* Order Details Section */}
				<section className='w-full flex flex-col gap-6'>
					<div
						id='new-customer-switch'
						className='flex items-center justify-between'
					>
						<p className='font-medium'>Order details</p>
						<FormField
							control={form.control}
							name='isNewCustomer'
							render={({ field }) => (
								<FormItem className='flex items-center justify-between gap-3'>
									<FormLabel>New Customer</FormLabel>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											className='!mt-0'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{isNewCustomer ? (
						<div className='grid grid-cols-2 gap-6'>
							<FormField
								control={form.control}
								name='newCustomer.firstName'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder='First name'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='newCustomer.lastName'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder='Last name'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='newCustomer.phoneNumber'
								render={({ field }) => (
									<FormItem className='col-span-2'>
										<FormControl>
											<Input
												{...field}
												placeholder='(644) 156-7890'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					) : (
						<FormField
							control={form.control}
							name='customerId'
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select customer' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{customers.map((customer) => (
												<SelectItem
													key={customer.id}
													value={customer.id}
												>
													{customer.firstName} {customer.lastName}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<div className='flex justify-between gap-5'>
						<FormField
							control={form.control}
							name='paymentMethod'
							render={({ field }) => (
								<FormItem className='w-full'>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Payment method' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{paymentMethodsTuple.map((method) => (
												<SelectItem
													key={method}
													value={method}
												>
													{method}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='deliveryMethod'
							render={({ field }) => (
								<FormItem className='w-full'>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Delivery type' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{deliveryMethodsTuple.map((deliveryType) => (
												<SelectItem
													key={deliveryType}
													value={deliveryType}
												>
													{deliveryType}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='flex justify-between gap-5'>
						<FormField
							control={form.control}
							name='deadline'
							render={({ field }) => (
								<FormItem className='flex flex-col w-full'>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground',
													)}
												>
													{field.value ? (
														format(field.value, 'PPP')
													) : (
														<span>Order date</span>
													)}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className='w-auto p-0'
											align='start'
										>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='orderStatus'
							render={({ field }) => (
								<FormItem className='w-full'>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Order status' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{orderStatusTuple.map((status) => (
												<SelectItem
													key={status}
													value={status}
												>
													{status}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='note'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										placeholder='Order note'
										rows={10}
										className='resize-none'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
				{/* Order Items Section */}
				<section className='w-full flex flex-col gap-6'>
					<div>
						<p className='font-medium'>Order items</p>
					</div>
					<FormField
						control={form.control}
						name='orderItems'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant='outline'
												role='combobox'
												className={cn(
													'justify-between',
													!field.value && 'text-muted-foreground',
												)}
											>
												Select products
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='p-0'>
										<Command>
											<CommandInput
												placeholder='Search products'
												className='h-9'
											/>
											<CommandEmpty>No framework found.</CommandEmpty>
											<CommandGroup>
												{products.map((product) => (
													<CommandItem
														value={product.id}
														key={product.id}
														onSelect={() => {
															const itemIndex = orderItems.findIndex(
																(i) => i.productId === product.id,
															);
															if (itemIndex !== -1) {
																removeOrderItem(itemIndex);
															} else {
																appendOrderItem({
																	productId: product.id,
																	quantity: 1,
																	unitPrice: product.price,
																});
															}
														}}
													>
														{product.name}
														<CheckIcon
															className={cn(
																'ml-auto h-4 w-4',
																field.value.some(
																	({ productId }) => productId === product.id,
																)
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					{orderItems.length > 0 ? (
						<ul className='max-h-[23rem] overflow-auto flex flex-col gap-2'>
							{orderItems.map((item, index) => {
								const match = products.find(
									(product) => product.id === item.productId,
								);
								if (!match) return null;

								const onItemQuantityChange = (value: 1 | -1) => {
									if (item.quantity + value < 1) {
										removeOrderItem(index);
									} else {
										updateOrderItem(index, {
											...item,
											quantity: item.quantity + value,
										});
									}
								};

								return (
									<li
										key={item.productId}
										className='flex justify-between border p-3 rounded-md'
									>
										<div className='w-9/12 flex flex-col gap-2'>
											<p className='font-medium truncate'>{match.name}</p>
											<p className='text-gray-400'>
												Price: {currencyFormatter(match.price)}
											</p>
											<p>
												Total: {currencyFormatter(match.price * item.quantity)}
											</p>
										</div>
										<div className='flex-1 flex flex-col items-center gap-2'>
											<Button
												type='button'
												variant='ghost'
												className='h-fit py-px text-destructive'
											>
												Remove
											</Button>
											<div className='flex gap-2'>
												<Button
													type='button'
													size={'sm'}
													className='h-fit py-px'
													onClick={() => onItemQuantityChange(-1)}
													variant={'secondary'}
												>
													-
												</Button>
												<p>{item.quantity}</p>
												<Button
													type='button'
													size={'sm'}
													onClick={() => onItemQuantityChange(1)}
													className='h-fit py-px'
													variant={'secondary'}
												>
													+
												</Button>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					) : (
						<div className='h-full flex flex-col items-center'>
							<Image
								src={'/empty-order-items.svg'}
								width={100}
								height={100}
								alt='Empty order items'
							/>
							<h5 className='font-medium text-lg'>
								Add Products to Your Order
							</h5>
							<p className='text-gray-400'>
								Select and add products to this order.
							</p>
						</div>
					)}
				</section>
				{/* Form Actions */}
				<div
					id='form-actions'
					className='col-span-full justify-self-end w-full flex items-center justify-center gap-11'
				>
					<Button
						type='button'
						variant='outline'
						className='w-1/3'
					>
						Cancel
					</Button>
					<Button
						type='submit'
						className='w-1/3'
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};
