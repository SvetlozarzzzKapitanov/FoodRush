import API from './api';
import { Product } from '../types';

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
    const response = await API.get<Product[]>('/products');
    return response.data;
};

// Create new product
export const createProduct = async (product: Partial<Product>): Promise<Product> => {
    const response = await API.post<Product>('/products', product);
    return response.data;
};

// Update existing product
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await API.put<Product>(`/products/${id}`, product);
    return response.data;
};

// Delete product
export const deleteProduct = async (id: number): Promise<void> => {
    await API.delete(`/products/${id}`);
};
