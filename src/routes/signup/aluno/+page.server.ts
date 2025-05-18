import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import {type Actions, type Cookies,redirect, type RequestEvent} from "@sveltejs/kit";
import { BACKEND_URL } from "$env/static/private";
import { setFlash } from "sveltekit-flash-message/server";
import { SchemaCpf } from "$lib/schemas/SchemaCpf";

/**
 * Usando "Zod Schemas" para validação client side
 * de dados no front-end.
 * 
 * Documentação: https://zod.dev/
 */

const registerSchema = z.object({
  name: z.string().min(2, { message: "Campo obrigatório." }),
  matricula: z.string().min(2, { message: "Campo obrigatório." }),
  cpf: SchemaCpf,
  password: z.string().min(4, { message: "A senha deve conter ao menos 4 caracteres" }),
});

export const load = async () => {
  const form = await superValidate(zod(registerSchema));
  return { form };
};

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
  post: async ({ cookies, request }: RequestEvent) => {
    const form = await superValidate(request, zod(registerSchema));

    if (!form.valid) {
      return setFlash({ type: "error", message: "Digite um CPF válido." }, cookies);
    }

    const { name, cpf, password, matricula } = form.data;

    const response = await fetch(`${BACKEND_URL}/aluno`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        cpf: cpf,
        senha: password,
        matricula: matricula,
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