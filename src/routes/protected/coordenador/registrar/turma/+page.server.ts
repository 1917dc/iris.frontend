import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { BACKEND_URL } from '$env/static/private';
import type { Professor } from '$lib/types/Professor';
import { zod } from 'sveltekit-superforms/adapters'
import { superValidate } from 'sveltekit-superforms'
import { handleError } from '$lib/components/notificator';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

const registerSchema = z.object({
    identificador: z.string().min(1, { message: "Campo obrigatório." }),
    sala: z.string().min(1, { message: "Campo obrigatório." }),
    temporadaLetiva: z.string().min(1, { message: "Campo obrigatório." }),
});

export const load = async () => {
    const form = await superValidate(zod(registerSchema));
    return { form };
  };

export const actions: Actions = {
    post: async({ request, cookies, locals }) => {
        const form = await superValidate(request, zod(registerSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { identificador, sala, temporadaLetiva } = form.data;

        const payload = {
            identificador,
            sala,
            temporadaLetiva,
        };

        const response = await fetch(`${BACKEND_URL}/coordenador/cadastrar-turma`, {
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

        setFlash({ type: 'success', message: 'Turma cadastrada com sucesso!' }, cookies);

        throw redirect(302, "/protected/coordenador/registrar/disciplinas");
        
    }
}