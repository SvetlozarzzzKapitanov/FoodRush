import {Product} from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await fetch('http://localhost:8080/api/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;

};

