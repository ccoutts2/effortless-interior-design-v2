import { faker } from '@faker-js/faker';

faker.seed(123);

export const schemes = (roomTypeNames: string[]) => {
	return {
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		roomTypeName: faker.helpers.arrayElement(roomTypeNames)
	};
};
