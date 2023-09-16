import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prismadb from '@/lib/prisma';
import { bcryptUtils } from '@/lib/services/bcrypt';

import { type NextAuthOptions } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prismadb) as Adapter,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'user@google.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '******',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const { email, password } = credentials;

				const user = await prismadb.user.findUnique({
					where: {
						email: email,
					},
				});

				if (!user) return null;

				const isPasswordCorrect = bcryptUtils.compare(password, user.password);

				if (!isPasswordCorrect) return null;

				return user;
			},
		}),
	],

	session: {
		strategy: 'jwt',
		maxAge: 86400,
	},

	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register',
	},

	callbacks: {
		async jwt({ token }) {
			const dbUser = await prismadb.user.findUnique({
				where: {
					email: token.email ?? 'no-email',
				},
			});

			if (dbUser && !dbUser.isActive) {
				throw new Error('User is not active. Talk to an admin');
			}

			token.id = dbUser?.id ? dbUser.id : 'no-uuid';
			token.firstName = dbUser?.firstName ? dbUser.firstName : 'no-firstName';

			return token;
		},

		async session({ session, token }) {
			if (session && session.user) {
				session.user.id = token.id;
				session.user.firstName = token.firstName;
			}
			return session;
		},
	},
};
