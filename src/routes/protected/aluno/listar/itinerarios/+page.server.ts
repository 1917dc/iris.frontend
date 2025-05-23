import { BACKEND_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { handleError } from '$lib/components/notificator';
import type { Itinerario } from '$lib/types/Itinerario';

export const load = (async ({cookies, locals}) => {

    const response = await fetch(`${BACKEND_URL}/aluno/listar-itinerarios`, {
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
    
    const itinerarios: Itinerario = await response.json()
    return { itinerarios };
}) satisfies PageServerLoad;