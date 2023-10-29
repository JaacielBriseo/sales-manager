import { DeliveryMethod, OrderStatus, PaymentMethod } from '@prisma/client';
import {
	User2,
	ChefHat,
	AlertCircle,
	ShoppingBasket,
	type LucideIcon,
} from 'lucide-react';

interface DashboardRoute {
	path: string;
	label: string;
	icon: LucideIcon;
}

export const dashboardRoutes: DashboardRoute[] = [
	{
		path: '/dashboard/supplies',
		label: 'Supplies',
		icon: ShoppingBasket,
	},
	{
		path: '/dashboard/products',
		label: 'Products',
		icon: ChefHat,
	},
	{
		path: '/dashboard/customers',
		label: 'Customers',
		icon: User2,
	},
	{
		path: '/dashboard/orders',
		label: 'Orders',
		icon: AlertCircle,
	},
];

export const paymentMethodsTuple = [
	PaymentMethod.CARD,
	PaymentMethod.CASH,
	PaymentMethod.TRANSFER,
] as const;

export const deliveryMethodsTuple = [
	DeliveryMethod.PICKUP,
	DeliveryMethod.DELIVERY,
] as const;

export const orderStatusTuple = [
	OrderStatus.PENDING,
	OrderStatus.CANCELLED,
	OrderStatus.COMPLETED,
] as const;
