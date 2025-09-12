export const roomTypeNames = ['Bedroom', 'Bathroom', 'Kitchen', 'Living Room'];

// Function to generate and return room types for the seed script
export const roomType = () => {
	return roomTypeNames.map((name) => ({ name }));
};
