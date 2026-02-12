import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate, setError } from 'sveltekit-superforms';
import z from 'zod';
import prisma from '$lib/server/prisma';

const schema = z.object({
	email: z.string().email(),
	name: z.string().min(1, 'Please enter a valid name').optional()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));

	return {
		form
	};
};

export const actions = {
	newsletterRegister: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return message(form, {
				status: 'invalid',
				text: 'Form was invalid. Please try again.'
			});
		}

		const emailCheck = await prisma.user.count({
			where: {
				email: form.data.email,
				newsletterSub: true
			}
		});

		if (emailCheck !== 0) {
			return setError(form, 'email', 'Email is already registered for a newsletter');
		}

		try {
			await prisma.user.upsert({
				where: { email: form.data.email },
				update: { newsletterSub: true },
				create: { email: form.data.email, name: form.data.name, newsletterSub: true }
			});

			cookies.set('newsletter_dismissed', 'true', {
				httpOnly: true,
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				sameSite: 'lax'
			});
		} catch (error) {
			console.log(error);
			return message(
				form,
				{
					status: 'error',
					text: 'Something went wrong. Please try again.'
				},
				{
					status: 500
				}
			);
		}

		return message(form, { text: 'Newsletter subscribed to successfully!' });
	},
	dismissNewsletter: async ({ cookies }) => {
		cookies.set('newsletter_dismissed', 'true', {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'lax'
		});
	}
} satisfies Actions;
