import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import {type Actions, type Cookies,redirect, type RequestEvent} from "@sveltejs/kit";
import { BACKEND_URL } from "$env/static/private";
import { setFlash } from "sveltekit-flash-message/server";
import { SchemaCpf } from "$lib/schemas/SchemaCpf";
import { handleError } from "$lib/components/notificator";
import type { PageServerLoad } from "./$types";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Campo obrigatório." }),
  turma: z.string().min(1, { message: "Selecione uma turma." }),
  cpf: SchemaCpf,
  password: z.string().min(4, { message: "A senha deve conter ao menos 4 caracteres" }),
});

export const load = (async ({cookies}) => {
  const form = await superValidate(zod(registerSchema));

  const response = await fetch(`${BACKEND_URL}/aluno/turmas-disponiveis`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      }
  });
  
  if(!response.ok){
      console.error(response.status);
      return await handleError(response, cookies);
  }
  const turmas: [] = await response.json();
  return { form, turmas };
}) satisfies PageServerLoad;

export const actions: Actions = {
  post: async ({ cookies, request }: RequestEvent) => {
    const form = await superValidate(request, zod(registerSchema));

    if (!form.valid) {
      return setFlash({ type: "error", message: "Digite um CPF válido." }, cookies);
    }

    const { name, cpf, password, turma } = form.data;

    const response = await fetch(`${BACKEND_URL}/aluno`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        cpf: cpf,
        senha: password,
        turmaIdentificador: turma,
      }),
    });

    if (!response.ok) {
      console.log(response);
      return await handleError(response, cookies);
    }

    setFlash({ type: 'success', message: 'O aluno foi cadastrado com sucesso!' }, cookies)

    throw redirect(302, "/auth/login");
    
  },
};