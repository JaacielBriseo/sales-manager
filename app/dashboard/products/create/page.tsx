import { UpsertProductForm } from '@/components/dashboard/products/upsert-product-form';

const DashboardProductsCreatePage = () => {
	return (
		<div className='flex flex-col gap-5 my-5'>
			<h1 className='text-2xl font-bold tracking-tight'>Create Product</h1>
			<UpsertProductForm product={null} />
		</div>
	);
};

export default DashboardProductsCreatePage;
