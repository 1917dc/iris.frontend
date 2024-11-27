import { BACKEND_URL } from "$env/static/private";
import {type Handle, redirect} from "@sveltejs/kit";
import { jwtDecode } from "jwt-decode";

export const handle = (async ({ event, resolve }) => {
    const { cookies } = event
    const cookieToken = cookies.get("token")
    let token : string | null = null

    try {
        if(typeof cookieToken === "string"){
            token = cookieToken

            const response = await fetch(BACKEND_URL + 'auth/validate/token', {
                method: 'POST',
                body: JSON.stringify({
                    "token" : token
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

    if(!token){
        return resolve(event)
    }

    event.locals.token = token;
    return resolve(event);
}) satisfies Handle;