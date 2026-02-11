import { PrismaClient } from '../src/generated/prisma/client';

import { roomType, products } from './generators';
import { roomTypeNames } from './generators/roomType';
import { resetDatabase } from './generators/resetDatabase';

export const prisma = new PrismaClient();

let productArray = [] as any;

async function createRoomTypes() {
	console.log('Creating room types');

	const roomTypes = roomType();
	for (const item of roomTypes) {
		await prisma.roomType.upsert({
			where: { name: item.name },
			update: { slug: item.slug },
			create: {
				name: item.name,
				slug: item.slug
			}
		});
	}

	console.log('Finished creating rooms');
}

async function createProducts() {
	console.log('Creating products');

	for (let i = 0; i < 10; i++) {
		const productData = products(roomTypeNames);
		const newProduct = await prisma.product.create({
			data: {
				...productData,
				prices: {
					create: {
						id: `price_${Math.random().toString(36)}`,
						active: true,
						currency: 'gbp',
						unitAmount: 75000,
						type: 'one_time'
					}
				}
			}
		});
		productArray.push(newProduct);
	}

	console.log('Finished creating products');
}

const main = async () => {
	console.log('\nCurrent environment is: ');
	await resetDatabase();

	await createRoomTypes();
	await createProducts();
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
	});
