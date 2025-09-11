import { faker } from '@faker-js/faker';
import { Scheme } from '@prisma/client';

faker.seed(123);

export const images = (scheme: Scheme) => {
	return {
		url: faker.image.urlLoremFlickr({ category: 'interior' }),
		schemeId: scheme.id,
		schemeIndex: faker.number.int({ min: 0, max: 4 }),
		roomTypeName: scheme.roomTypeName
	};
};
