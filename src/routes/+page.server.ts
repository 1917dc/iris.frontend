import { message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import {type Actions, type Cookies, fail, redirect, type RequestEvent} from "@sveltejs/kit";
import { BACKEND_URL } from "$env/static/private";
import type { User } from "$lib/types/User";
import type { Token } from "$lib/types/Token";
import { setFlash } from "sveltekit-flash-message/server";
import { jwtDecode } from "jwt-decode";

const loginSchema = z.object({
  cpf: z.string().refine((cpf: string) => {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    const cpfDigits = cpf.split("").map((el) => +el);
    const rest = (count: number): number => {
      return (
        ((cpfDigits
          .slice(0, count - 12)
          .reduce((soma, el, index) => soma + el * (count - index), 0) *
          10) %
          11) %
        10
      );
    };
    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  }, "Digite um CPF válido."),

  password: z.string(),
});

export const load = async () => {
  // TODO:
  // AQUI DEVEMOS COLOCAR A CHAMADA DA API DO BACKEND,

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
  login: async ({ cookies, request }: RequestEvent) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) {
      return setFlash({ type: "error", message: "Digite um CPF válido." }, cookies);
    }

    const { cpf, password } = form.data;

    const response = await fetch(BACKEND_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: cpf,
        password: password,
      }),
    });

    if (!response.ok) {
      return await handleError(response, cookies);
    }

    const user : User = await response.json();
    const token : Token = jwtDecode(user.token.token);
    const expirationTime = Math.floor(token.exp - (Date.now() / 1000));

    cookies.set("user", JSON.stringify(user), {
      path: "/",
      httpOnly: true,
      maxAge: expirationTime,
      sameSite: "strict",
    });

    if (user.typeUser === "professor") {
      throw redirect(302, "/protected/professor");
    } else if (user.typeUser === "coordenador") {
      throw redirect(302, "/protected/coordenador/disciplinas");
    }

    throw redirect(302, "/protected/coordenador/disciplinas");
  },
};