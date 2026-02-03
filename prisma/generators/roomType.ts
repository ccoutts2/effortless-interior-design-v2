export const roomTypeNames = ['Bedroom', 'Bathroom', 'Kitchen', 'Living Room'];

const slugify = (str: string) =>
	str
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');

// Function to generate and return room types for the seed script
export const roomType = () => {
	return roomTypeNames.map((roomName) => ({ name: roomName, slug: slugify(roomName) }));
};
