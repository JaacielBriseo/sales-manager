import { DashboardNavbar } from '@/components/dashboard/layout/dashboard-navbar';

interface Props {
	children: React.ReactNode;
}

const DashboardRootLayout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<DashboardNavbar />
			{children}
		</>
	);
};

export default DashboardRootLayout;
