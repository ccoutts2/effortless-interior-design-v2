import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

interface RoomSchemeProps {
	params: {
		roomTypeName: string;
	};
}

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

export const load: PageServerLoad = async ({ params }: RoomSchemeProps) => {
	const schemes = await fetchSchemes(params.roomTypeName);

	return {
		schemes
	};
};
