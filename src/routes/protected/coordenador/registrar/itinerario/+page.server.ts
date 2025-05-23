import { z } from 'zod';
import { BACKEND_URL } from '$env/static/private';
import { zod } from 'sveltekit-superforms/adapters'
import { superValidate } from 'sveltekit-superforms'
import { handleError } from '$lib/components/notificator';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { registerSchema } from '$lib/schemas/registerSchema';

export const load = async () => {
    const form = await superValidate(zod(registerSchema));

    if (!form.data.qtdVagas) {
        form.data.qtdVagas = 1;
    }

    return { form };
};

export const actions: Actions = {
    post: async({ request, cookies, locals }) => {
        const formData = await request.formData();

        const form = await superValidate(request, zod(registerSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { nome, tipo, qtdVagas, horarios } = form.data;

        const payload = {
            nome,
            tipo,
            qtdVagas,
            horarios: horarios.map(horario => ({
                diaDaSemana: horario.diaDaSemana.toString(),
                comeco: horario.comeco,
                fim: horario.fim
            }))
        };

        const response = await fetch(`${BACKEND_URL}/coordenador/adicionar-itinerario`, {
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

        setFlash({ type: 'success', message: 'Itinerário cadastrado com sucesso!' }, cookies);

        throw redirect(302, "/protected/coordenador/registrar/disciplina-itinerario");
        
    }
}