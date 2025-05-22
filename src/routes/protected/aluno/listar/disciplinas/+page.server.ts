import { BACKEND_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { handleError } from '$lib/components/notificator';
import type { Turma } from '$lib/types/Turma';

export const load = (async ({cookies, locals}) => {

    const response = await fetch(`${BACKEND_URL}/aluno/turmas`, {
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
    
    const studentData: Turma = await response.json()
    return { studentData };
}) satisfies PageServerLoad;