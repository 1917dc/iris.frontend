import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.set('token', '', {
        path: '/',
        expires: new Date(0),
        httpOnly: true,
        sameSite: 'strict'
    })

    return redirect(303, '/auth/login');
};