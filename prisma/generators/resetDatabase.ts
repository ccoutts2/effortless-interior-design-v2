import { prisma } from '../seed';

export async function resetDatabase() {
	console.log('Resetting the database');

	await prisma.roomType.deleteMany({});
	await prisma.scheme.deleteMany({});
	await prisma.image.deleteMany({});

	console.log('Database is reset');
}
