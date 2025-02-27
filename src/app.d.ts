// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {User} from "$lib/types/User";

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
