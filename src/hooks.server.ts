import { BACKEND_URL } from "$env/static/private";
import {type Handle, redirect} from "@sveltejs/kit";
import { jwtDecode } from "jwt-decode";

export const handle = (async ({ event, resolve }) => {
    const { cookies } = event
    const cookieToken = cookies.get("token")

    try {
        if(typeof cookieToken === "string"){

            const response = await fetch(BACKEND_URL + 'auth/validar-token', {
                method: 'POST',
                body: JSON.stringify({
                    "token": cookieToken
                })
            })

            
            if(!response.ok){
                throw redirect(308, '/')
            }
        }
        
        
    } catch(e : any){
        console.error(`Erro ao assimilar token: ${e.message}`)
    }

    // TODO: Fazer o tratamento de exceção do token de usuário
    //       e fazer uma tela personalizada de erro, que dá a opção de efetuar o login de novo. 

    if (!cookieToken){
        return resolve(event)
    }

    event.locals.token = cookieToken;
    return resolve(event);
}) satisfies Handle;