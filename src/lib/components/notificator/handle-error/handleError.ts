import type { Cookies } from "@sveltejs/kit";
import { setFlash } from "sveltekit-flash-message/server";

const handleError = async (response: Response, cookies: Cookies) => {
    let errorMessage;
      
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensagem;
        } catch (e) {
          errorMessage = "Erro inesperado. Tente novamente mais tarde.";
        }
      
        setFlash({ type: "error", message: errorMessage }, cookies);
}

export default handleError;