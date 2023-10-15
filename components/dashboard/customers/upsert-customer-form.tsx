import { redirect } from 'next/navigation';
import { upsertCustomer } from '@/actions/customers';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { type Prisma } from '@prisma/client';
interface Props {
	customerId?: string;
	customer: Prisma.CustomerGetPayload<{
		select: {
			address: {
				select: {
					city: true;
					country: true;
					state: true;
					postalCode: true;
					streetName: true;
					streetNumber: true;
					neighborhood: true;
				};
			};
			firstName: true;
			lastName: true;
			email: true;
			phoneNumber: true;
		};
	}> | null;
}

export const UpsertCustomerForm: React.FC<Props> = ({
	customer,
	customerId,
}) => {
	const formAction = async (formData: FormData) => {
		'use server';
		await upsertCustomer(formData);
		redirect(`/dashboard/customers`);
	};

	const isEdit = !!customer;

	return (
		<form
			action={formAction}
			className='grid grid-cols-2 gap-4'
		>
			<input
				type='hidden'
				id='customerId'
				name='customerId'
				defaultValue={customerId || ''}
			/>
			<h1 className='text-2xl font-medium col-span-2 mb-2'>
				{isEdit ? 'Edit Customer' : 'Register Customer'}
			</h1>
			<h2 className='text-xl font-medium col-span-2'>User</h2>

			<div className='flex flex-col gap-3'>
				<Label htmlFor='firstName'>First Name</Label>
				<Input
					id='firstName'
					name='firstName'
					type='text'
					data-cy='firstNameInput'
					defaultValue={isEdit ? customer?.firstName : ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='lastName'>Last Name</Label>
				<Input
					id='lastName'
					name='lastName'
					type='text'
					data-cy='lastNameInput'
					defaultValue={isEdit ? customer?.lastName : ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='phoneNumber'>Phone Number</Label>
				<Input
					id='phoneNumber'
					name='phoneNumber'
					type='text'
					data-cy='phoneNumberInput'
					defaultValue={isEdit ? customer?.phoneNumber : ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='email'>Email</Label>
				<Input
					id='email'
					name='email'
					type='text'
					data-cy='emailInput'
					defaultValue={customer?.email || ''}
				/>
			</div>
			<h2 className='text-xl font-medium col-span-2'>Address</h2>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='address.city'>City</Label>
				<Input
					id='address.city'
					name='address.city'
					type='text'
					data-cy='address.cityInput'
					defaultValue={customer?.address?.city || ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='address.country'>Country</Label>
				<Input
					id='address.country'
					name='address.country'
					type='text'
					data-cy='address.countryInput'
					defaultValue={customer?.address?.country || ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='address.state'>State</Label>
				<Input
					id='address.state'
					name='address.state'
					type='text'
					data-cy='address.stateInput'
					defaultValue={customer?.address?.state || ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='address.postalCode'>Postal Code</Label>
				<Input
					id='address.postalCode'
					name='address.postalCode'
					type='text'
					data-cy='address.postalCodeInput'
					defaultValue={customer?.address?.postalCode || ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='address.streetName'>Street Name</Label>
				<Input
					id='address.streetName'
					name='address.streetName'
					type='text'
					data-cy='address.streetNameInput'
					defaultValue={customer?.address?.streetName || ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='address.streetNumber'>Street Number</Label>
				<Input
					id='address.streetNumber'
					name='address.streetNumber'
					type='text'
					data-cy='address.streetNumberInput'
					defaultValue={customer?.address?.streetNumber || ''}
				/>
			</div>
			<div className='flex flex-col gap-3'>
				<Label htmlFor='address.neighborhood'>Neighborhood</Label>
				<Input
					id='address.neighborhood'
					name='address.neighborhood'
					type='text'
					data-cy='address.neighborhoodInput'
					defaultValue={customer?.address?.neighborhood || ''}
				/>
			</div>
			<Button
				type='submit'
				className='place-self-end col-start-2 w-1/2'
			>
				{isEdit ? 'Save Changes' : 'Register Customer'}
			</Button>
		</form>
	);
};
