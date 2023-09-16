import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Sales Manager System',
	description:
		'Simple but powerful sales manager system for starting businesses.',
	keywords: [
		'sales',
		'manager',
		'system',
		'business',
		'sales manager system',
		'sales manager',
		'sales system',
	],
	authors: [
		{
			name: 'Jaaciel',
			url: 'https://www.jaacielb.co/',
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={font.className}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
