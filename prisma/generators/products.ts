import { faker } from '@faker-js/faker';

faker.seed(123);

const roomImageCategories: Record<string, string[]> = {
	Bedroom: ['bedroom', 'bed', 'wardrobe'],
	Bathroom: ['bathroom', 'bathtub', 'shower'],
	Kitchen: ['kitchen', 'kitchen-cabinet', 'countertop'],
	'Living Room': ['living-room', 'sofa', 'armchair']
};

const imagesForRoom = (roomTypeName?: string) => {
	const categories = (roomTypeName && roomImageCategories[roomTypeName]) || ['furniture'];
	return faker.helpers
		.arrayElements(categories, { min: 2, max: categories.length })
		.map((category) => faker.image.urlLoremFlickr({ category }));
};

export const products = (roomTypeNames: string[]) => {
	const roomTypeName =
		roomTypeNames.length > 0 ? faker.helpers.arrayElement(roomTypeNames) : undefined;

	return {
		name: faker.commerce.productName(),
		isScheme: true,
		description: faker.commerce.productDescription(),
		active: true,
		features: [faker.commerce.productMaterial(), faker.commerce.productAdjective()],
		images: imagesForRoom(roomTypeName),
		roomTypeName
	};
};
