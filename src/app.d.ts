// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {User} from "$lib/types/User";

/**
 * @classdesc - app.d.ts
 * Classe que serve para armazenar declarações
 * de tipos & variáveis globais que serão usados 
 * dentro da aplicação, de preferência mais de uma vez.
 * 
 * 
 * @type { Locals }
 * Esse tipo por exemplo, armazena
 * variáveis, que por sua vez ficarão disponíveis
 * para uso dentro dos servidores das respectivas rotas.
 * 
 * Exemplo de uso em classe: /protected/coordenador/+layout.server.ts
 */

declare global {
	namespace App {
		interface Error {}
		interface Locals {
			token?: string; 
			user?: User;
		}
		interface PageData {
			flash?: { type: 'success' | 'error' | 'warning'; message: string };
		}

		interface PageState {}
		interface Platform {}
		namespace SuperForms {
			type Message = {
				type: 'error' | 'success' | 'warning', text:string
			}
		}
	}
}

export {};
