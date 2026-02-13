import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user } = locals;

	if (user !== null || !user.password || !user.isAdmin) {
		throw redirect(302, '/');
	}
};
