import { newsLetterAction } from '$lib/sharedActions/newsletterRegister';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { newsLetterSchema } from '$lib/sharedActions/newsletterRegister';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(newsLetterSchema));

	return {
		form
	};
};

export const actions: Actions = newsLetterAction;
