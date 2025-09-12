import prisma from '$lib/server/prisma';
import type { User } from '@prisma/client';

import { redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const newsLetterSchema = z.object({
	email: z.string().email()
});

export const newsLetterAction = {
	newsLetterRegister: async ({ request }) => {
		const form = await superValidate(request, zod(newsLetterSchema));

		if (!form.valid) {
			return message(form, {
				status: 'invalid',
				text: 'Form was invalid. Please try again.'
			});
		}

		const emailCheck = await prisma.user.count({
			where: {
				email: form.data.email
			}
		});

		if (emailCheck !== 0) {
			return setError(form, 'email', 'Email already exists');
		}

		let user: User;

		try {
			user = await prisma.user.create({
				data: {
					email: form.data.email,
					newsletterSub: true
				}
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
	}
} satisfies Actions;
