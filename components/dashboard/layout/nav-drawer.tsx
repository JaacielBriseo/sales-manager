import { Menu } from 'lucide-react';
import { DashboardSidebar } from './dashboard-sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const NavDrawer = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu />
			</SheetTrigger>
			<SheetContent side='left'>
				<DashboardSidebar />
			</SheetContent>
		</Sheet>
	);
};
