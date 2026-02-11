import { faker } from '@faker-js/faker';

faker.seed(123);

export const products = (roomTypeNames: string[]) => {
	return {
		id: `prod_${faker.string.alphanumeric(14)}`,
		name: faker.commerce.productName(),
		isScheme: true,
		description: faker.commerce.productDescription(),
		active: true,
		features: [faker.commerce.productMaterial(), faker.commerce.productAdjective()],
		images: [faker.image.avatarGitHub()],
		roomTypeName: roomTypeNames.length > 0 ? faker.helpers.arrayElement(roomTypeNames) : undefined
	};
};
