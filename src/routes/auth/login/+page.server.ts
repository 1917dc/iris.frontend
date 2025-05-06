import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import {type Actions, type Cookies,redirect, type RequestEvent} from "@sveltejs/kit";
import { BACKEND_URL } from "$env/static/private";
import type { Token } from "$lib/types/Token";
import { setFlash } from "sveltekit-flash-message/server";
import { jwtDecode } from "jwt-decode";
import { SchemaCpf } from "$lib/schemas/SchemaCpf";

/**
 * Usando "Zod Schemas" para validação client side
 * de dados no front-end.
 * 
 * Documentação: https://zod.dev/
 */

const loginSchema = z.object({
  cpf: SchemaCpf,
  password: z.string(),
});

export const load = async () => {
  const form = await superValidate(zod(loginSchema));
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
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) {
      return setFlash({ type: "error", message: "Digite um CPF válido." }, cookies);
    }

    const { cpf, password } = form.data;

    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: cpf,
        senha: password,
      }),
    });

    if (!response.ok) {
      console.log(response);
      return await handleError(response, cookies);
    }

    
    const rawToken = await response.json();
    const token: Token = jwtDecode(rawToken.token);
    const expirationTime = Math.floor(token.exp - (Date.now() / 1000));

    cookies.set("token", rawToken.token, {
      path: "/",
      httpOnly: true,
      maxAge: expirationTime,
      sameSite: "strict",
    });

    if (token.role.includes("COORDENADOR")) {
      throw redirect(302, "/protected/coordenador/listar/disciplinas");
    } else if (token.role.includes("PROFESSOR")) {
      throw redirect(302, "/protected/professor/disciplinas");
    } 
  },
};