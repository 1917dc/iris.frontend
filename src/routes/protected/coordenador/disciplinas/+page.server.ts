import { BACKEND_URL } from "$env/static/private";
import type { User } from "$lib/types/User.js";


export const load = async ({ cookies }) => {
    console.log(cookies);
}