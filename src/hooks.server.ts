import { BACKEND_URL } from "$env/static/private";
import { type Handle } from "@sveltejs/kit";
import type { Token } from "$lib/types/Token";
import { jwtDecode } from "jwt-decode";

/**
 * @classdesc - hooks.server.ts
 * Classe que executa a cada refresh de página
 * é ideal colocar chamadas de autenticação de usuário
 * aqui dentro, pois assim teremos noção em 100% do tempo
 * se o usuário deve ou não estar tendo acesso á aplicação.
 * 
 * Basicamente um middleware, recomendo pesquisar mais
 * a fundo caso ainda existam dúvidas.
 * 
 * @type { event } representa o contexto do server-side da aplicação
 */
export const handle = (async ({ event, resolve }) => {
    const { cookies } = event
    const token = cookies.get("token")
    if (!token || typeof token !== "string"){
        console.error("Token inválido ou não identificado")
        return resolve(event);
    }
    event.locals.token = token;

    const response = await fetch(
        `${BACKEND_URL}/professores/info-conta`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );


    if(!response.ok){
        console.error(`Erro ao puxar dados do usuário: ${response.status}`)
        return resolve(event);
    }
    event.locals.user = await response.json();
    
    return resolve(event);
}) satisfies Handle;