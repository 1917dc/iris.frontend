import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
    cookies.set('user', '', {
        path: '/',
        expires: new Date(0)
    })

    return redirect(307, '/');
};