import { faker } from '@faker-js/faker';

faker.seed(123);

export const schemes = (roomTypeNames: string[]) => {
	return {
		id: `prod_${faker.string.alphanumeric(14)}`,
		name: faker.commerce.productName(),
		images: [faker.image.avatarGitHub()],
		features: [faker.commerce.productMaterial(), faker.commerce.productAdjective()],
		description: faker.commerce.productDescription(),
		roomTypeName: faker.helpers.arrayElement(roomTypeNames),
		active: true
	};
};
