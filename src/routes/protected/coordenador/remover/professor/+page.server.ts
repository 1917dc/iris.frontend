import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { SchemaCpf } from '$lib/schemas/SchemaCpf';
import { superValidate } from 'sveltekit-superforms';
import { BACKEND_URL } from '$env/static/private';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Cookies } from '@sveltejs/kit';

const searchSchema = z.object({
    cpf: SchemaCpf
});

const handleError = async (response: Response, cookies: Cookies) => {
    let errorMessage;
  
    try {
      const errorData = await response.json();
      errorMessage = errorData.mensagem;
    } catch (e) {
      errorMessage = "Erro inesperado. Tente novamente mais tarde.";
    }
  
    setFlash({ type: "error", message: errorMessage }, cookies);
  };

export const load = (async () => {
    const form = await superValidate(zod(searchSchema))

    return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
    post: async({ cookies, request, locals }: RequestEvent) => {
        const form = await superValidate(request, zod(searchSchema))

        const { cpf } = form.data;

        const response = await fetch(`${BACKEND_URL}/professores/${cpf}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            }
        });

        if(!response.ok){
            console.error(response)
            return await handleError(response, cookies);
        }

        const professor = await response.json();
        console.log(professor)
    }
}