import { message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { type Actions, fail, redirect, type RequestEvent } from "@sveltejs/kit";
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

export const actions: Actions = {
  login: async ({ cookies, request }: RequestEvent) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) {
      return setFlash({ type: "error", message: "Digite um CPF válido." }, cookies);
    }

    const { cpf, password } = form.data;

    // O usuário sempre é inicializado com o valor nulo
    let user : User | null = null;

    try {
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
        setFlash({ type: "error", message: "CPF ou senha estão incorretos." }, cookies);
        return message(form, { status: "error", text: "CPF ou senha estão incorretos." }, {
          status: 401,
        });
      }

      user = await response.json();

      // Valida o usuário antes de proceder
      if (!user || !user.token || !user.token.token) {
        setFlash({ type: "error", message: "Erro ao processar dados do usuário." }, cookies);
        return message(form, { status: "error", text: "Erro ao processar dados do usuário." }, {
          status: 500,
        });
      }

      const token : Token = jwtDecode(user.token.token);

      cookies.set("user", JSON.stringify(user), {
        path: "/",
        httpOnly: true,
        maxAge: token.exp/ 1000,
        sameSite: "strict",
      });

    } catch (e) {
      console.error('Login error:', e);
      setFlash({ type: "error", message: "Erro no servidor. Tente novamente mais tarde." }, cookies);
      return message(form, { status: "error", text: "Erro no servidor. Tente novamente mais tarde." }, {
        status: 500,
      });
    }

    if (user) {
      if (user.typeUser === "professor") {
        throw redirect(302, "/protected/professor");
      } else if (user.typeUser === "coordenador") {
        throw redirect(302, "/protected/coordenador/disciplinas");
      }

      throw redirect(302, "/protected/coordenador/disciplinas");
    } else {
      setFlash({ type: "error", message: "Usuário não encontrado." }, cookies);
      return message(form, { status: "error", text: "Usuário não encontrado." }, {
        status: 404,
      });
    }
  },
};
