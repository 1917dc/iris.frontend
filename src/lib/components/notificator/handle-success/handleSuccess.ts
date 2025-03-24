import type { Cookies } from "@sveltejs/kit"
import { setFlash } from "sveltekit-flash-message/server"

const handleSuccess = (cookies: Cookies, message: string) => {
    setFlash({ type: 'success', message: `${ message }` }, cookies)
}

export default handleSuccess;