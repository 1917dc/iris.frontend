import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { BACKEND_URL } from '$env/static/private';
import type { Professor } from '$lib/types/Professor';
import { zod } from 'sveltekit-superforms/adapters'
import { superValidate } from 'sveltekit-superforms'
import { handleError } from '$lib/components/notificator';
import { type Actions, fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Turma } from '$lib/types/Turma';

const registerSchema = z.object({
    disciplina: z.string().min(1, { message: "Campo obrigatório." }),
    professor: z.string().min(1, { message: "Selecione um professor." }),
    turma: z.string().min(1, { message: "Selecione uma turma." }),
});

export const load = (async ({cookies, locals}) => {
    const form = await superValidate(zod(registerSchema));

    const professoresResponse = await fetch(`${BACKEND_URL}/coordenador/professores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.token}`
        }
    });
    
    if(!professoresResponse.ok){
        console.error(professoresResponse.status);
        return await handleError(professoresResponse, cookies);
    }
    const professores: Professor[] = await professoresResponse.json();

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

    return { form, professores, turmas };
}) satisfies PageServerLoad;

export const actions: Actions = {
    post: async({ request, cookies, locals }) => {
        const form = await superValidate(request, zod(registerSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { disciplina, professor, turma } = form.data;

        const payload = {
            nome: disciplina,
            professorCpf: professor
        };
        
        const addDisciplina = await fetch(`${BACKEND_URL}/coordenador/adicionar-disciplina`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            },
            body: JSON.stringify(payload)
        });
        
        if (!addDisciplina.ok) {
            return await handleError(addDisciplina, cookies);
        }

        const addDisciplinaTurma = await fetch(`${BACKEND_URL}/coordenador/adicionar-disciplina-turma?identificador=${turma}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${locals.token}`
            },
            body: JSON.stringify([disciplina])
        });

        if (!addDisciplinaTurma.ok) {
            return await handleError(addDisciplinaTurma, cookies);
        }

        setFlash({ type: 'success', message: 'Disciplina registrada com sucesso!' }, cookies);

        return { form };
    }
}