import { MobileSidebar } from './mobile-sidebar';
import { NavigationIndicator } from './navigation-indicator';

export const DashboardNavbar = () => {
	return (
		<div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
			<MobileSidebar />
			<NavigationIndicator />
		</div>
	);
};
