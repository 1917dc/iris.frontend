import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Aluno } from '$lib/types/Aluno';
import { handleError } from '$lib/components/notificator';

export const load = (async ({ cookies, locals }) => {
    const response = await fetch(`${BACKEND_URL}/coordenador/alunos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.token}`
        }
    })

    if(!response.ok){
        console.error(response.status);
        return await handleError(response, cookies);
    }
    const alunos: Aluno[] = await response.json();

    return { alunos };
}) satisfies PageServerLoad;

// Aqui requisição para editar aluno