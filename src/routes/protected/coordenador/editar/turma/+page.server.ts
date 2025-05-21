import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { BACKEND_URL } from '$env/static/private';
import { handleError } from '$lib/components/notificator';
import type { Turma } from '$lib/types/Turma';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail, superValidate } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';

const updateTurmaSchema = z.object({
    identificador: z.string().min(1, { message: "Campo obrigatório." }),
    sala: z.string().min(1, { message: "Campo obrigatório." }),
    temporadaLetiva: z.string().min(1, { message: "Campo obrigatório." }),
});

export const load = (async ({ cookies, locals }) => {
    const response = await fetch(`${BACKEND_URL}/coordenador/turmas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${locals.token}`
      }
    });
  
    if (!response.ok) {
      console.error(response.status);
      return await handleError(response, cookies);
    }
  
    const turmas: Turma[] = await response.json();

    return { turmas };
}) satisfies PageServerLoad;

export const actions: Actions = {
    edit: async({ cookies, request, locals }: RequestEvent) => {

        const form = await superValidate(request, zod(updateTurmaSchema));

        if (!form.valid) {
          console.log('Validation Errors:', form.errors);
          return fail(400, { form });
        }
    
        const { identificador, sala, temporadaLetiva } = form.data;

        const response = await fetch(`${BACKEND_URL}/coordenador/atualizar-turma`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            },
            body: JSON.stringify({
                identificador,
                sala,
                temporadaLetiva
            }),

        });

        if(!response.ok){
            return await handleError(response, cookies);
        }

        setFlash({ type: 'success', message: "A turma foi editada com sucesso!" }, cookies)
        return { form };
    }
}