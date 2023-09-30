import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DashboardRoutesList } from '@/components/dashboard/layout/dashboard-routes-list';

export const NavDrawer = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu />
			</SheetTrigger>
			<SheetContent side='left'>
				<DashboardRoutesList />
			</SheetContent>
		</Sheet>
	);
};
