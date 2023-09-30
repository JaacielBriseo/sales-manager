import { NavDrawer } from '@/components/dashboard/layout/nav-drawer';
import { DashboardRoutesList } from '@/components/dashboard/layout/dashboard-routes-list';

export const DashboardNavbar = () => {
	return (
		<header className='border-b h-16 flex items-center md:justify-center px-4 md:px-0'>
			<nav className='flex items-center md:justify-between w-full md:container'>
				<div className='md:hidden'>
					<NavDrawer />
				</div>
				<div className='hidden md:block'>
					<DashboardRoutesList />
				</div>
			</nav>
		</header>
	);
};
