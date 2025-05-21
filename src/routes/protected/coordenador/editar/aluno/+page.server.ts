import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Aluno } from '$lib/types/Aluno';
import { handleError } from '$lib/components/notificator';
import type { Turma } from '$lib/types/Turma';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail, superValidate } from 'sveltekit-superforms';
import { SchemaCpf } from '$lib/schemas/SchemaCpf';

const updateAlunoSchema = z.object({
    nome: z.string().min(2, { message: "Campo obrigatório." }),
    cpf: SchemaCpf,
    turmaIdentificador: z.string().min(1, { message: "Selecione uma turma." }),
    senha: z.string().min(4, { message: "A senha deve conter ao menos 8 caracteres" }),
    confirm: z.string(),
}).refine((data) => data.senha === data.confirm, "As senhas não coincidem");

export const load = (async ({ cookies, locals }) => {
    const alunoResponse = await fetch(`${BACKEND_URL}/coordenador/alunos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.token}`
        }
    })

    if(!alunoResponse.ok){
        console.error(alunoResponse.status);
        return await handleError(alunoResponse, cookies);
    }
    const alunos: Aluno[] = await alunoResponse.json();

    const turmaResponse = await fetch(`${BACKEND_URL}/coordenador/turmas`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.token}`
        }
    })

    if(!turmaResponse.ok){
        console.error(turmaResponse.status);
        return await handleError(turmaResponse, cookies);
    }
    const turmas: Turma[] = await turmaResponse.json();

    return { alunos, turmas };
}) satisfies PageServerLoad;

export const actions: Actions = {
    edit: async({ cookies, request, locals }: RequestEvent) => {

        const form = await superValidate(request, zod(updateAlunoSchema));

        if (!form.valid) {
          return fail(400, { form });
        }
    
        const { nome, cpf, senha, turmaIdentificador } = form.data;

        const response = await fetch(`${BACKEND_URL}/coordenador/alterar-aluno`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            },
            body: JSON.stringify({
                nome,
                cpf,
                senha,
                turmaIdentificador
            }),
        });

        if(!response.ok){
            return await handleError(response, cookies);
        }

        setFlash({ type: 'success', message: "O aluno foi editado com sucesso!" }, cookies)
        return { form };
    }
}