import API from './api';
import { Restaurant } from '../types';

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
    const res = await API.get<Restaurant[]>('/restaurants');
    return res.data;
};

export const getRestaurantById = async (id: number): Promise<Restaurant> => {
    const res = await API.get<Restaurant>(`/restaurants/${id}`);
    return res.data;
};

export const createRestaurant = async (restaurant: Partial<Restaurant>): Promise<Restaurant> => {
    const res = await API.post<Restaurant>('/restaurants', restaurant);
    return res.data;
};

export const updateRestaurant = async (id: number, restaurant: Partial<Restaurant>): Promise<Restaurant> => {
    const res = await API.put<Restaurant>(`/restaurants/${id}`, restaurant);
    return res.data;
};

export const deleteRestaurant = async (id: number): Promise<void> => {
    await API.delete(`/restaurants/${id}`);
};