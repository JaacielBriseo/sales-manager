import { DashboardNavbar } from '@/components/dashboard/layout/dashboard-navbar';
import { DashboardSidebar } from '@/components/dashboard/layout/dashboard-sidebar';

interface Props {
	children: React.ReactNode;
}

const DashboardRootLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className="h-full">
		<div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
			<DashboardNavbar />
		</div>
		<div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
			<DashboardSidebar />
		</div>
		<main className="md:pl-56 pt-[80px] h-full">
			{children}
		</main>
	</div>
	);
};

export default DashboardRootLayout;
