import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { BACKEND_URL } from '$env/static/private';
import { handleError } from '$lib/components/notificator';
import type { Disciplina } from '$lib/types/Disciplina';
import { setFlash } from 'sveltekit-flash-message/server';

export const load = (async ({ cookies, locals }) => {
    const response = await fetch(`${BACKEND_URL}/coordenador/disciplinas`, {
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
  
    const disciplinas: Disciplina[] = await response.json();

    return { disciplinas };
}) satisfies PageServerLoad;

export const actions: Actions = {
    delete: async({ cookies, request, locals }: RequestEvent) => {

        const data = await request.formData();
        const nome = data.get("nome");

        const response = await fetch(`${BACKEND_URL}/coordenador/remover-disciplina?nome=${nome}`, {
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

        setFlash({ type: 'success', message: 'A disciplina foi excluída com sucesso!' }, cookies)
        console.log("Disciplina excluída com sucesso.")
    }
}