import type { PageServerLoad } from './$types';
import { BACKEND_URL } from '$env/static/private';
import { handleError } from '$lib/components/notificator';
import type { Disciplina } from '$lib/types/Disciplina';

export const load = (async ({ cookies, locals }) => {
    const response = await fetch(`${BACKEND_URL}/coordenador/turmas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${locals.token}`
      }
    });
  
    if (!response.ok) {
      console.error(response.status);
      return await handleError(response, cookies);
    }
  
    const disciplinas: Disciplina[] = await response.json();
    return { disciplinas };
}) satisfies PageServerLoad;