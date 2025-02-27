import { BACKEND_URL } from "$env/static/private";
import type { Token } from "$lib/types/Token.js";
import type { User } from "$lib/types/User.js";
import { jwtDecode } from "jwt-decode";
import type { PageServerLoad } from "./$types";


export const load:PageServerLoad = async ({ cookies }) => {
    const rawToken = cookies.get("token");
    if(!rawToken || typeof rawToken !== "string") {
        throw new Error("Token inválido ou não identificado")
    }
    
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
        throw new Error(`Erro ao puxar dados do usuário: ${response.status}`)
    }
    const user:User = await response.json();
    return {
        user
    }
}