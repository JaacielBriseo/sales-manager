import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;

	// If it's the root path, just render it
	if (path === '/') {
		return NextResponse.next();
	}

	const session = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	});

	if (!session && path.includes('/dashboard')) {
		return NextResponse.redirect(new URL('/auth/login', req.url));
	} else if (session && path.includes('/auth')) {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}
	return NextResponse.next();
}
