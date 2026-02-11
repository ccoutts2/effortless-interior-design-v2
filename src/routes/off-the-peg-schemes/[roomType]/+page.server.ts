import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

interface RoomProductProps {
	params: {
		roomType: string;
	};
}

const fetchProducts = async (roomTypeSlug: string) => {
	const products = await prisma.product.findMany({
		where: {
			roomType: {
				slug: {
					equals: roomTypeSlug,
					mode: 'insensitive'
				}
			},
			active: true
		},
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			roomType: {
				select: {
					name: true,
					slug: true
				}
			}
		}
	});
	return products;
};

export const load: PageServerLoad = async ({ params }: RoomProductProps) => {
	const products = await fetchProducts(params.roomType);

	return {
		products
	};
};
