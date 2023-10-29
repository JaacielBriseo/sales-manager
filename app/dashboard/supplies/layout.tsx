interface Props {
	children: React.ReactNode;
}

const DashboardSuppliesRootLayout: React.FC<Props> = ({ children }) => {
	return <main className='container'>{children}</main>;
};

export default DashboardSuppliesRootLayout;
