import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const getUserSession = async () => await getServerSession(authOptions);
