import {type Handle, redirect} from "@sveltejs/kit";
import type {User} from "$lib/types/User";
import { jwtDecode } from "jwt-decode";

export const handle = (async ({ event, resolve }) => {
    const tokenCookie = event.cookies.get("token");
    let token : string | null = null;

    try{
        if(typeof tokenCookie === "string"){
            token = tokenCookie;
        }
    } catch(e) {
        console.error(`Error parsing token cookie: ${e}`);
    }

    if(!token){
        return resolve(event)
    }

    event.locals.token = token;

    return resolve(event);
}) satisfies Handle;