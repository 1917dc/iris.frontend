import { BACKEND_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { handleError } from '$lib/components/notificator';
import type { Professor } from '$lib/types/Professor';

export const load = (async ({cookies, locals}) => {

    const response = await fetch(`${BACKEND_URL}/professores`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${locals.token}`
        }
    })

    if(!response.ok) {
        console.error(response.status)
        return await handleError(response, cookies)
    }
    
    const professores: Professor[] = await response.json()
    return { professores };
}) satisfies PageServerLoad;