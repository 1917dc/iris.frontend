import type { PageServerLoad } from "./$types";
import type { User } from "$lib/types/User";


export const load:PageServerLoad = async (event) => {
    const user = event.locals.user;
    if(!user) {
        throw new Error("Usuário não autenticado");
    }

    return {        
        user
    }
}