import { notFound } from 'next/navigation';
import prismadb from '@/lib/prisma';
import { UpsertProductForm } from '@/components/dashboard/products/upsert-product-form';

interface Props {
	params: { id: string };
}

const getProductById = async (id: string) => {
	return await prismadb.product.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			name: true,
			description: true,
			inStock: true,
			imageURLs: true,
			tags: true,
			price: true,
		},
	});
};

const ProductByIdUpdatePage: React.FC<Props> = async ({ params: { id } }) => {
	const product = await getProductById(id);

	if (!product) {
		notFound();
	}

	return (
		<div className='flex flex-col gap-5 my-5'>
			<h1 className='text-2xl font-bold tracking-tight'>Update Product</h1>
			<UpsertProductForm product={product} />
		</div>
	);
};

export default ProductByIdUpdatePage;
