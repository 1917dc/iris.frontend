import { BACKEND_URL } from "$env/static/private";
import { type Handle } from "@sveltejs/kit";
import type { Token } from "$lib/types/Token";
import { jwtDecode } from "jwt-decode";

// TODO: Fazer o tratamento de exceção do token de usuário
//       e fazer uma tela personalizada de erro, que dá a opção de efetuar o login de novo. 

export const handle = (async ({ event, resolve }) => {
    const { cookies } = event
    const rawToken = cookies.get("token")
    if (!rawToken || typeof rawToken !== "string"){
        console.error("Token inválido ou não identificado")
        return resolve(event);
    }
    event.locals.token = rawToken;

    const token: Token = jwtDecode(rawToken);
    const response = await fetch(
        `${BACKEND_URL}/professores/${token.sub}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${rawToken}`,
          },
        }
      );

    if(!response.ok){
        console.error(`Erro ao puxar dados do usuário: ${response.status}`)
        event.locals.user = null;
        return resolve(event);
    }
    event.locals.user = await response.json();
    
    return resolve(event);
}) satisfies Handle;