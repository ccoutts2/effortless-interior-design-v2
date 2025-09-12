import { faker } from '@faker-js/faker';

faker.seed(123);

export const schemes = (roomTypeNames: string[]) => {
	return {
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: faker.number.int({ min: 450, max: 1000 }),
		isAvailable: faker.datatype.boolean({ probability: 0.8 }),
		roomTypeName: faker.helpers.arrayElement(roomTypeNames)
	};
};
