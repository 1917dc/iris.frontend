import { BACKEND_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    // TODO:
    // const response = await fetch(`${BACKEND_URL}/`)


    return {};
}) satisfies PageServerLoad;