import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { BACKEND_URL } from '$env/static/private';
import { handleError } from '$lib/components/notificator';
import type { Itinerario } from '$lib/types/Itinerario';
import { setFlash } from 'sveltekit-flash-message/server';

export const load = (async ({ cookies, locals }) => {
    const response = await fetch(`${BACKEND_URL}/coordenador/itinerarios`, {
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
  
    const itinerarios: Itinerario[] = await response.json();

    return { itinerarios };
}) satisfies PageServerLoad;

export const actions: Actions = {
    delete: async({ cookies, request, locals }: RequestEvent) => {

        const data = await request.formData();
        const nome = data.get("nome");

        const response = await fetch(`${BACKEND_URL}/coordenador/remover-itinerario?nome=${nome}`, {
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

        setFlash({ type: 'success', message: 'O itinerário foi excluído com sucesso!' }, cookies)
        console.log("Itinerário excluído com sucesso.")
    }
}