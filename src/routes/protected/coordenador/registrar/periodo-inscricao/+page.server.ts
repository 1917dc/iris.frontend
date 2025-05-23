import { z } from 'zod';
import { BACKEND_URL } from '$env/static/private';
import { zod } from 'sveltekit-superforms/adapters'
import { superValidate } from 'sveltekit-superforms'
import { handleError } from '$lib/components/notificator';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import type { Itinerario } from '$lib/types/Itinerario';
import type { Turma } from '$lib/types/Turma';

const registerSchema = z.object({
    dataFim: z.string().min(1, { message: "Campo obrigatório." }),
    itinerariosNome: z.array(z.string()).min(1, { message: "Informe pelo menos um itinerário." }),
    turmasPermitidasNome: z.array(z.string()).min(1, { message: "Informe pelo menos uma turma." })
});

export const load = (async ({ cookies, locals }) => {
    const form = await superValidate(zod(registerSchema));

    const itinerariosResponse = await fetch(`${BACKEND_URL}/coordenador/itinerarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${locals.token}`
      }
    });
  
    if (!itinerariosResponse.ok) {
      console.error(itinerariosResponse.status);
      return await handleError(itinerariosResponse, cookies);
    }
  
    const itinerarios: Itinerario[] = await itinerariosResponse.json();

    const turmasResponse = await fetch(`${BACKEND_URL}/coordenador/turmas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${locals.token}`
      }
    });
  
    if (!turmasResponse.ok) {
      console.error(turmasResponse.status);
      return await handleError(turmasResponse, cookies);
    }
  
    const turmas: Turma[] = await turmasResponse.json();

    return { form, itinerarios, turmas };
}) satisfies PageServerLoad;

  
export const actions: Actions = {
    post: async({ request, cookies, locals }) => {
        const form = await superValidate(request, zod(registerSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { dataFim, itinerariosNome, turmasPermitidasNome } = form.data;

        const payload = {
            dataFim,
            itinerariosNome: itinerariosNome.map((it) => it.toString()),
            turmasPermitidasNome: turmasPermitidasNome.map((turma) => turma.toString()),
        };

        const response = await fetch(`${BACKEND_URL}/coordenador/cadastrar-periodo-inscricao`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            return await handleError(response, cookies);
        }

        setFlash({ type: 'success', message: 'Período de inscrição criado com sucesso!' }, cookies);

        return { form }
        
    }
}