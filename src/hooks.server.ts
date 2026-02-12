import { sequence } from '@sveltejs/kit/hooks';
import {
	validateSessionToken,
	setSessionTokenCookie,
	deleteSessionTokenCookie,
	generateSessionToken,
	createSession
} from '$lib/server/session';

import type { Handle } from '@sveltejs/kit';

const authHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		const newToken = await generateSessionToken();
		const session = await createSession(newToken, null);

		if (session) {
			await setSessionTokenCookie(event, newToken, session.expiresAt);
			event.locals.session = session;
		} else {
			event.locals.session = null;
		}
		event.locals.user = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);

	if (session !== null) {
		await setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};

export const handle = sequence(authHandle);
