interface Props {
	children: React.ReactNode;
}

const DashboardProductsRootLayout: React.FC<Props> = ({ children }) => {
	return <main className='container'>{children}</main>;
};

export default DashboardProductsRootLayout;
