import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import type { Professor } from '$lib/types/Professor';
import { handleError, handleSuccess } from '$lib/components/notificator';

export const load = (async ({ cookies, locals }) => {
    const response = await fetch(`${BACKEND_URL}/coordenador/professores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.token}`
        }
    })

    if(!response.ok){
        return await handleError(response, cookies);
    }
    const professores: Professor[] = await response.json();

    return { professores };
}) satisfies PageServerLoad;

export const actions: Actions = {
    edit: async({ cookies, request, locals }: RequestEvent) => {

        const data = await request.formData();
        console.log(data);

        const response = await fetch(`${BACKEND_URL}/coordenador/alterar-professor/${cpf}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            }
        });

        if(!response.ok){
            return await handleError(response, cookies);
        }

        handleSuccess(cookies, "Professor alterado com sucesso!");
    }
}