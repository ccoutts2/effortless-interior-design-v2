import { PrismaClient } from '../src/generated/prisma/client';

import { roomType, images, schemes } from './generators';
import { roomTypeNames } from './generators/roomType';
import { resetDatabase } from './generators/resetDatabase';

export const prisma = new PrismaClient();

let schemeArray = [] as any;

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

async function createSchemes() {
	console.log('Creating schemes');

	for (let i = 0; i < 10; i++) {
		const schemeData = schemes(roomTypeNames);
		const newScheme = await prisma.scheme.create({ data: schemeData });
		schemeArray.push(newScheme);
	}

	console.log('Finished creating schemes');
}

async function createImages() {
	console.log('Creating images');
	for (const scheme of schemeArray) {
		const imageGenerator = images(scheme);
		await prisma.image.create({
			data: imageGenerator
		});
	}
	console.log('Finished creating images');
}

const main = async () => {
	console.log('\nCurrent environment is: ');
	await resetDatabase();

	await createRoomTypes();
	await createSchemes();
	await createImages();
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
	});
