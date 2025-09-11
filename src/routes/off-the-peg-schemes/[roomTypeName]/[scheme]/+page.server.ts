import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

interface SchemeProps {
	params: {
		scheme: string;
	};
}

const fetchScheme = async (id: number) => {
	const scheme = await prisma.scheme.findUniqueOrThrow({
		where: { id },
		include: {
			images: {
				orderBy: { schemeIndex: 'asc' }
			}
		}
	});
	return scheme;
};

export const load: PageServerLoad = async ({ params }: SchemeProps) => {
	const scheme = await fetchScheme(Number(params.scheme));

	return {
		scheme
	};
};
