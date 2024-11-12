import type { PageServerLoad } from './$types';
import {message, superValidate} from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod';
import {type Actions, type Cookies, fail} from "@sveltejs/kit";
import { BACKEND_URL } from '$env/static/private';
import {setFlash} from "sveltekit-flash-message/server";

const loginSchema = z.object({
    cpf: z.string()
        .refine((cpf: string) => {
            if (typeof cpf !== "string") return false;
            cpf = cpf.replace(/[^\d]+/g, "");
            if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
            const cpfDigits = cpf.split("").map((el) => +el);
            const rest = (count: number): number => {
                return (((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10);
            };
            return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
        }, "Digite um CPF válido."),
    password: z.string().min(8, { message: "A senha deve conter ao menos 8 caracteres" }),
    confirm: z.string(),
    name: z.string(),
})
    .refine((data) => data.password == data.confirm, "As senhas não coincidem");

export const load = (async () => {

    const form = await superValidate(zod(loginSchema));
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
    register: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(loginSchema));
        
        if(!form.valid){
            return fail(400, { form: form })
        }

        const { cpf, password, name } = form.data;

        const response = await fetch(BACKEND_URL + 'auth/register/professor', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
                // TODO:
                // assim que o encapsulamento da rota for implementado
                // passar o token no header da requisição
            },
            body: JSON.stringify({
                name: name,
                cpf: cpf,
                password: password,
            })
        })

        if(!response.ok){
            return await handleError(response, cookies);
        }

        setFlash({ type: 'success', message: 'O professor foi cadastrado com sucesso!' }, cookies)
        return { form }
    }
}