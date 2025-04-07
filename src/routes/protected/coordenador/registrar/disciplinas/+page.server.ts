import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { BACKEND_URL } from '$env/static/private';
import type { Professor } from '$lib/types/Professor';
import { zod } from 'sveltekit-superforms/adapters'
import { superValidate } from 'sveltekit-superforms'
import { handleError } from '$lib/components/notificator';
import type { Actions } from '@sveltejs/kit';

export const load = (async ({cookies, locals}) => {
    const response = await fetch(`${BACKEND_URL}/coordenador/professores`, {
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
    const professores: Professor[] = await response.json();
    return { professores };
}) satisfies PageServerLoad;

export const actions: Actions = {
    post: async({ request, cookies, locals }) => {
        
    }
}