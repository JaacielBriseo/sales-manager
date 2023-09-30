import {
  User2,
  ChefHat,
	AlertCircle,
	LayoutDashboard,
	type LucideIcon,
} from 'lucide-react';

interface DashboardRoute {
	path: string;
	label: string;
	icon: LucideIcon;
}

export const dashboardRoutes: DashboardRoute[] = [
	{
		path: '/dashboard/overview',
		label: 'Overview',
		icon: LayoutDashboard,
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
