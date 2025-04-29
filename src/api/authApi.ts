// src/api/authApi.ts
import API from './api'
import { User } from '../types'
import { RegisterCredentials } from '../types'

export interface LoginRequest {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export const loginUser = async (
    credentials: LoginCredentials
): Promise<{ token: string }> => {
    const response = await API.post<{ token: string }>('/auth/login', credentials);
    const token = response.data.token;

    localStorage.setItem('token', token);
    if (!token) {
        throw new Error('Login response missing token.');
    }

    console.log('Received token:', token);
    return { token };
};



export const registerCustomer = async (data: RegisterCredentials): Promise<void> => {
    await API.post('/auth/register/customer', data);
};

export const registerEmployee = async (data: RegisterCredentials): Promise<void> => {
    await API.post('/auth/register/employee', data);
}

export const registerDelivery = async (data: RegisterCredentials): Promise<void> => {
    await API.post('/auth/register/delivery', data);
}
