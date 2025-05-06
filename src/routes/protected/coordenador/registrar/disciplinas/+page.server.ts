import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { BACKEND_URL } from '$env/static/private';
import type { Professor } from '$lib/types/Professor';
import { zod } from 'sveltekit-superforms/adapters'
import { superValidate } from 'sveltekit-superforms'
import { handleError } from '$lib/components/notificator';
import { type Actions, fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

const registerSchema = z.object({
    identificador: z.string().min(1, { message: "Campo obrigatório." }),
    sala: z.string().min(1, { message: "Campo obrigatório." }),
    disciplina: z.string().min(1, { message: "Campo obrigatório." }),
    professor: z.string().min(1, { message: "Selecione um professor." }),
});

export const load = (async ({cookies, locals}) => {
    const form = await superValidate(zod(registerSchema));

    const response = await fetch(`${BACKEND_URL}/coordenador/professores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.token}`
        }
    });
    
    if(!response.ok){
        console.error(response.status);
        return await handleError(response, cookies);
    }
    const professores: Professor[] = await response.json();
    return { form, professores };
}) satisfies PageServerLoad;

export const actions: Actions = {
    post: async({ request, cookies, locals }) => {
        const form = await superValidate(request, zod(registerSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { identificador, sala, disciplina, professor } = form.data;

        const payload = {
            identificador,
            sala,
            disciplina,
            professorCPF: professor
        };

        console.log("Payload enviado:", payload);


        const response = await fetch(`${BACKEND_URL}/coordenador/cadastrar-turma`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            },
            body: JSON.stringify(payload)
        });


        console.log("Resposta do back-end:", await response.json());

        if (!response.ok) {
            return await handleError(response, cookies);
        }

        setFlash({ type: 'success', message: 'Turma registrada com sucesso!' }, cookies);

        return { form };
        
    }
}