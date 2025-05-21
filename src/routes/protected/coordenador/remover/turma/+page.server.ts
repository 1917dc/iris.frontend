import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { BACKEND_URL } from '$env/static/private';
import { handleError } from '$lib/components/notificator';
import type { Turma } from '$lib/types/Turma';
import { setFlash } from 'sveltekit-flash-message/server';

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
    delete: async({ cookies, request, locals }: RequestEvent) => {

        const data = await request.formData();
        const identificador = data.get("identificador");

        const response = await fetch(`${BACKEND_URL}/coordenador/deletar-turma?identificador=${identificador}`, {
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

        setFlash({ type: 'success', message: 'A turma foi excluída com sucesso!' }, cookies)
        console.log("Turma excluída com sucesso.")
    }
}