import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { StripeService } from '$lib/services/stripe.service';

export const load: PageServerLoad = async ({ url }) => {
	const sessionId = url.searchParams.get('session_id');

	if (sessionId === null) {
		throw redirect(302, '/shopping/error');
	}

	try {
		const session = await StripeService.retrieveSession(sessionId);

		return {
			customerEmail: session.customer_details?.email,
			items: session.line_items,
			status: session.status
		};
	} catch (error) {
		console.error(error);
		throw redirect(302, '/shopping/error');
	}
};
