interface Props {
	children: React.ReactNode;
}

const DashboardOrdersRootLayout: React.FC<Props> = ({ children }) => {
	return <main className='container'>{children}</main>;
};

export default DashboardOrdersRootLayout;
