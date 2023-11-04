import { DeliveryMethod, OrderStatus, PaymentMethod } from '@prisma/client';
import {
	User2,
	ChefHat,
	AlertCircle,
	ShoppingBasket,
	type LucideIcon,
	LayoutDashboard,
} from 'lucide-react';

interface DashboardRoute {
	href: string;
	label: string;
	icon: LucideIcon;
}

export const dashboardRoutes: DashboardRoute[] = [
	{
		href: '/dashboard/',
		label: 'Overview',
		icon: LayoutDashboard
	},
	{
		href: '/dashboard/supplies',
		label: 'Supplies',
		icon: ShoppingBasket,
	},
	{
		href: '/dashboard/products',
		label: 'Products',
		icon: ChefHat,
	},
	{
		href: '/dashboard/customers',
		label: 'Customers',
		icon: User2,
	},
	{
		href: '/dashboard/orders',
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

export const paginationConstants = {
	perPage: 25,
	page:1,
} as const;
