import { Restaurant } from '../types';

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
    // Fake API delay simulation
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: 'Green Garden Bistro',
                    description: 'Fresh organic meals and cozy atmosphere.',
                    location: 'Downtown',
                    imageUrl: '/Bistro.jpg'
                },
                {
                    id: 2,
                    name: 'Urban Grill House',
                    description: 'Best steaks and BBQ in town!',
                    location: 'City Center',
                    imageUrl: '/Grill.jpg'
                },
                {
                    id: 3,
                    name: 'Sunset Sushi Bar',
                    description: 'Authentic Japanese sushi experience.',
                    location: 'Seaside',
                    imageUrl: '/SushiBar.jpg'
                }
            ]);
        }, 1000); // simulate 1s server delay
    });
};
