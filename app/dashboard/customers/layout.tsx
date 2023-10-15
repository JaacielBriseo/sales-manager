interface Props {
	children: React.ReactNode;
}

const DashboardCustomersRootLayout: React.FC<Props> = ({ children }) => {
	return <main className='container pt-5'>{children}</main>;
};

export default DashboardCustomersRootLayout;
