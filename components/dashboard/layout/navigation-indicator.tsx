'use client';

import { usePathname } from 'next/navigation';

export const NavigationIndicator = () => {
	const pathname = usePathname();

  const isRoot = pathname === '/dashboard';
	return (
		<div className='text-gray-500 text-sm capitalize'>
      <p>
       {
        isRoot ? 'Overview' : pathname.slice(1).replaceAll('/', ' > ')
       }
      </p>
    </div>
	);
};
