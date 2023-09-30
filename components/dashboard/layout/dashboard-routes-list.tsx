'use client';

import { usePathname } from 'next/navigation';
import { dashboardRoutes } from '@/lib/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const DashboardRoutesList = () => {
	const pathname = usePathname();

	return (
		<ul className='flex flex-col md:flex-row md:justify-between gap-2'>
			{dashboardRoutes.map(({ icon: Icon, label, path }) => {
				const isActive = pathname.includes(path);
				return (
					<li key={path}>
						<Link
							href={path}
							className={cn(
								'text-sm font-medium transition-colors hover:text-primary',
                {
                  'text-primary underline underline-offset-4': isActive,
                }
							)}
						>
              <Icon className="inline-block w-5 h-5 mr-2" />
							{label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
