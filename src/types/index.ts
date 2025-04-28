export interface Product {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    category: string
    restaurantId: number
}

export interface Order {
    id: number
    userId: number
    products: Product[]
    total: number
    status: 'pending' | 'preparing' | 'delivered' | 'cancelled'
    createdAt: string
    updatedAt: string
}

export interface User {
    id: number
    name: string
    email: string
    address?: string
    role: 'customer' | 'admin'
}
export type Restaurant = {
    id: number;
    name: string;
    description: string;
    location: string;
    imageUrl?: string;
};