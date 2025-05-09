import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Professor } from '$lib/types/Professor';
import { handleError } from '$lib/components/notificator';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { SchemaCpf } from "$lib/schemas/SchemaCpf";

const updateProfessorSchema = z.object({
    cpf: SchemaCpf,
    name: z.string().min(2, { message: "Campo obrigatório." }),
    password: z.string().min(4, { message: "A senha deve conter ao menos 8 caracteres" }),
    confirm: z.string(),

  }).refine((data) => data.password === data.confirm, "As senhas não coincidem");

export const load = (async ({ cookies, locals }) => {
    const response = await fetch(`${BACKEND_URL}/coordenador/professores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.token}`
        }
    })

    if(!response.ok){
        return await handleError(response, cookies);
    }
    const professores: Professor[] = await response.json();

    return { professores };
}) satisfies PageServerLoad;

export const actions: Actions = {
    edit: async({ cookies, request, locals }: RequestEvent) => {

        const form = await superValidate(request, zod(updateProfessorSchema));

        if (!form.valid) {
          console.log('Validation Errors:', form.errors);
          return fail(400, { form });
        }
    
        const { cpf, name, password } = form.data;

        const response = await fetch(`${BACKEND_URL}/coordenador/alterar-professor?cpf=${cpf}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            },
            body: JSON.stringify({
                nome: name,
                cpf: cpf,
                senha: password
            }),

        });

        if(!response.ok){
            return await handleError(response, cookies);
        }

        setFlash({ type: 'success', message: "O professor foi editado com sucesso!" }, cookies)
        return { form };
    }
}