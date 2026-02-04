import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

interface RoomSchemeProps {
	params: {
		roomType: string;
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
			active: true
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
	const schemes = await fetchSchemes(params.roomType);

	return {
		schemes
	};
};
