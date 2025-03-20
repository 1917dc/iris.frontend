import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod';
import {type Actions, type Cookies, fail} from "@sveltejs/kit";
import { BACKEND_URL } from '$env/static/private';
import {setFlash} from "sveltekit-flash-message/server";
import { SchemaCpf } from "$lib/schemas/SchemaCpf";

const registerSchema = z.object({
    cpf: SchemaCpf,
    password: z.string().min(4, { message: "A senha deve conter ao menos 8 caracteres" }),
    confirm: z.string(),
    name: z.string().min(2, { message: "Campo obrigatório." }),
})
    .refine((data) => data.password == data.confirm, "As senhas não coincidem");

export const load = (async () => {

    const form = await superValidate(zod(registerSchema));
    return { form };
}) satisfies PageServerLoad;

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

export const actions: Actions = {
    post: async ({ request, cookies, locals }) => {
        const form = await superValidate(request, zod(registerSchema));

        if(!form.valid){
            return fail(400, { form: form })
        }

        const { cpf, password, name } = form.data;

        const response = await fetch(`${BACKEND_URL}/coordenador/registrar-professor`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${locals.token}`
            },
            body: JSON.stringify({
                nome: name,
                cpf: cpf,
                senha: password
            })
        })

        if(!response.ok){
            return await handleError(response, cookies);
        }

        setFlash({ type: 'success', message: 'O professor foi cadastrado com sucesso!' }, cookies)
        return { form }
    }
}