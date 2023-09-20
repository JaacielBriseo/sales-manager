'use client';

import Link from 'next/link';

import { useMobileMenu } from '@/hooks/use-mobile-menu';

import {
	Home,
	LogIn,
	LogOut,
	UserPlus,
	MoreHorizontal,
	LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouteOption {
	label: string;
	href: string;
	icon?: React.ReactNode;
}

const noAuthOptions: Array<RouteOption> = [
	{
		label: 'Sign in',
		href: '/auth/login',
		icon: <LogIn color='black' />,
	},
	{
		label: 'Sign up',
		href: '/auth/register',
		icon: <UserPlus color='black' />,
	},
];

const withAuthOptions: Array<RouteOption> = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: <LayoutDashboard color='black' />,
	},
	{
		label: 'Home',
		href: '/',
		icon: <Home color='black' />,
	},
];

const basicOptions: Array<RouteOption> = [
	{
		label: 'Product',
		href: '#',
	},
	{
		label: 'Company',
		href: '#',
	},
	{
		label: 'Contact',
		href: '#',
	},
];

interface Props {
	isAuth: boolean;
}

export const MobileMenu: React.FC<Props> = ({ isAuth }) => {
	const routes = isAuth
		? [...basicOptions, ...withAuthOptions]
		: [...basicOptions, ...noAuthOptions];
	const { isOpen, toggle } = useMobileMenu();

	return (
		<>
			<Button
				variant='ghost'
				onClick={toggle}
				className={`flex items-center justify-center gap-1 active:bg-transparent focus:bg-transparent`}
			>
				<span className='sr-only'>Toggle Menu</span>
				<MoreHorizontal color='white' />
			</Button>

			{isOpen && (
				<>
					<div
						className='fixed inset-0 bg-black/80 z-10 overflow-hidden'
						onClick={toggle}
					/>
					<ul
						className={`z-20 flex flex-col items-start justify-center gap-5 fixed inset-0 w-9/12 h-4/6 m-auto bg-secondary border rounded-2xl p-5 `}
					>
						{routes.map((route) => (
							<li key={route.label}>
								<Link
									href={route.href}
									className='flex items-start justify-center gap-1'
								>
									{route.icon && route.icon}
									<span className='text-primary font-medium tracking-wide'>
										{route.label}
									</span>
								</Link>
							</li>
						))}
						{isAuth && (
							<button className='flex items-center justify-center gap-1'>
								<LogOut />
								<span className='text-primary font-medium tracking-wide'>
									Sign out
								</span>
							</button>
						)}
					</ul>
				</>
			)}
		</>
	);
};
