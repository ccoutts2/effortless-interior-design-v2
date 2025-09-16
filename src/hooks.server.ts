import {
	createSession,
	validateSessionToken,
	deleteSessionTokenCookie,
	setSessionTokenCookie
} from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

const authHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;

	let session = null;

	if (token) {
		session = await validateSessionToken(token);
	}

	if (!session) {
		if (token) {
			deleteSessionTokenCookie(event);
		}

		const newSession = await createSession();
		session = newSession;

		const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
		setSessionTokenCookie(event, newSession.token, expiresAt);
	}

	event.locals.session = session;

	return resolve(event);
};

export const handle = authHandle;
