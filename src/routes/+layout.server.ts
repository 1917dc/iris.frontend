import type {LayoutServerLoad} from "./$types";
import { loadFlash } from 'sveltekit-flash-message/server'

export const load: LayoutServerLoad = loadFlash(async({ locals }) => {
    return {
        token: locals.token,
        user: locals.user
    }
})