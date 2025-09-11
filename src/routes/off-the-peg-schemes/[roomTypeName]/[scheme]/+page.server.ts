import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

interface SchemeProps {
	params: {
		roomTypeName: string;
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

const fetchSchemes = async (roomTypeName: string) => {
	const schemes = await prisma.scheme.findMany({
		where: {
			roomTypeName: {
				equals: roomTypeName,
				mode: 'insensitive'
			},
			isAvailable: true
		},
		include: {
			images: {
				orderBy: { schemeIndex: 'asc' }
			}
		}
	});
	return schemes;
};

export const load: PageServerLoad = async ({ params }: SchemeProps) => {
	const scheme = await fetchScheme(Number(params.scheme));
	const schemes = await fetchSchemes(params.roomTypeName);
	return {
		scheme,
		schemes
	};
};
