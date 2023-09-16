interface Props {
	children: React.ReactNode;
}

const AuthRootLayout: React.FC<Props> = ({ children }) => {
	return <main className='min-h-screen flex items-center justify-center'>{children}</main>;
};

export default AuthRootLayout;
