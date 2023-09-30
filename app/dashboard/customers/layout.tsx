interface Props {
	children: React.ReactNode;
}

const DashboardCustomersRootLayout: React.FC<Props> = ({ children }) => {
	return <main className='container'>{children}</main>;
};

export default DashboardCustomersRootLayout;
