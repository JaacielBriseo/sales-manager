interface Props {
	children: React.ReactNode;
}

const DashboardOverviewRootLayout: React.FC<Props> = ({ children }) => {
	return <main className='container'>{children}</main>;
};

export default DashboardOverviewRootLayout;
