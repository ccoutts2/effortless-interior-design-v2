import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

interface RoomSchemeProps {
	params: {
		roomTypeSlug: string;
	};
}

const fetchSchemes = async (roomTypeSlug: string) => {
	const schemes = await prisma.scheme.findMany({
		where: {
			roomType: {
				slug: {
					equals: roomTypeSlug,
					mode: 'insensitive'
				}
			},
			isAvailable: true
		},
		include: {
			images: {
				orderBy: { schemeIndex: 'asc' }
			},
			roomType: true
		}
	});
	return schemes;
};

export const load: PageServerLoad = async ({ params }: RoomSchemeProps) => {
	const schemes = await fetchSchemes(params.roomTypeSlug);

	return {
		schemes
	};
};
