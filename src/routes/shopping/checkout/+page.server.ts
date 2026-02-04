import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	const clientSecret = cookies.get('client-secret');
	if (clientSecret) {
		cookies.delete('client-secret', { path: '/' });
		return {
			clientSecret: clientSecret
		};
	}
};
