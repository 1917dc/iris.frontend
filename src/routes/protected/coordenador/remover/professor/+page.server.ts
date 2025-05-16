import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Professor } from '$lib/types/Professor';
import { handleError } from '$lib/components/notificator';

export const load = (async ({ cookies, locals }) => {
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
    delete: async({ cookies, request, locals }: RequestEvent) => {

        const data = await request.formData();
        const cpf = data.get("cpf");

        const response = await fetch(`${BACKEND_URL}/coordenador/desabilitar-habilitar-usuario?cpf=${cpf}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            }
        });

        if(!response.ok){
            console.error(response)
            return await handleError(response, cookies);
        }

        setFlash({ type: 'success', message: 'O professor foi desabilitado com sucesso!' }, cookies)
        console.log("Professor desabilitado com sucesso.")
    }
}