import Image from 'next/image';
import { MobileMenu } from '@/components/landing/mobile-menu';
import { getUserSession } from '@/lib/user-session';

export const LandingNavbar = async () => {
	const session = await getUserSession();
	return (
		<header
			style={{
				backgroundImage:
					'url(/bg-pattern-intro-mobile.svg), linear-gradient(to right, #ff8f70, #ff3d54)',
				backgroundPosition: 'center, center',
				backgroundRepeat: 'no-repeat, no-repeat',
			}}
			className='border-b rounded-bl-[6rem] p-5 h-[32rem] flex flex-col'
		>
			<nav className='flex items-center justify-between'>
				<div>
					<Image
						src='/logo.svg'
						alt='Logo'
						height={70}
						width={70}
					/>
				</div>
				<div className='relative'>
					<MobileMenu isAuth={!!session} />
				</div>
			</nav>
			<div className='m-auto'>
				<h1 className='text-4xl font-bold text-center text-white'>
					A modern sales-inventory solution
				</h1>
				<p className='text-white text-center mt-3 font-light'>
					Manage your sales and inventory in one place and increase your profits
				</p>
				<div className='flex items-center justify-center gap-3 mt-5'>
					<button className='px-4 py-2 mt-4 font-bold text-[#ff3d54] bg-white rounded-3xl'>
						Start for Free
					</button>
					<button className='px-4 py-2 mt-4 font-medium border bg-transparent text-white rounded-3xl'>
						Learn More
					</button>
				</div>
			</div>
		</header>
	);
};
