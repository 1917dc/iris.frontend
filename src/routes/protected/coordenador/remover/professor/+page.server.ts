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
import type { Professor } from '$lib/types/Professor';

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

export const load = (async ({ cookies, locals }) => {
    const form = await superValidate(zod(searchSchema))

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

    return { form, professores };
}) satisfies PageServerLoad;

export const actions: Actions = {
    delete: async({ cookies, request, locals }: RequestEvent) => {

        const data = await request.formData();
        const cpf = data.get("cpf");

        const response = await fetch(`${BACKEND_URL}/coordenador/deletar-professor/${cpf}`, {
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

        setFlash({ type: 'success', message: 'O professor foi deletado com sucesso!' }, cookies)
        console.log("Professor deletado com sucesso.")
    }
}