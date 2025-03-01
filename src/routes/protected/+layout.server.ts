import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { loadFlash } from 'sveltekit-flash-message/server'

/**
 * @classdesc - +layout.server.ts
 * Rotas +page.server.ts só rodam especificamente nas rotas
 * nas quais elas são colocadas. Para fazer uma lógica server-side
 * que incluem todas as rotas filhas em questão 
 * 
 */

export const load: LayoutServerLoad = loadFlash(async({ locals }) => {
    if(!locals.token) {
        return redirect(308, "/auth/login");
    }

    return {
        token: locals.token,
        user: locals.user
    }
})