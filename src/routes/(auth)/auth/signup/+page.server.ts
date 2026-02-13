import { hashPassword, verifyPasswordHash } from '$lib/server/password';
import prisma from '$lib/server/prisma';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import type { User } from '../../../../generated/prisma/client';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';

const schema = z.object({
	email: z.email(),
	name: z.string().min(1, 'Please enter a name.'),
	password: z.string().min(8, 'Password is not long enough.')
});

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;
	const form = await superValidate(zod4(schema));

	if (user !== null && user.password !== null) {
		throw redirect(302, '/');
	}

	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod4(schema));

		let user: User;
		const email = form.data.email;
		const passwordHash = await hashPassword(form.data.password);

		if (!form.valid) {
			return message(form, {
				status: 500,
				text: 'Form was invalid. Please check the form for errors.'
			});
		}

		try {
			const emailCheck = await prisma.user.findUnique({
				where: { email }
			});

			if (emailCheck) {
				return message(
					form,
					{
						status: 'error',
						text: 'Email already exists. Please login.'
					},
					{
						status: 400
					}
				);
			}

			user = await prisma.user.create({
				data: {
					email: email,
					name: form.data.name,
					password: passwordHash
				}
			});

			if (event.locals.user) {
				await prisma.session.update({
					where: { id: event.locals.session.id },
					data: { userId: user.id }
				});
			} else {
				const sessionToken = await generateSessionToken();
				const session = await createSession(sessionToken, user.id);
				await setSessionTokenCookie(event, sessionToken, session!.expiresAt);
			}
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

		throw redirect(302, '/admin/dashboard');
	}
} satisfies Actions;
