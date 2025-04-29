// src/api/authApi.ts
import API from './api';

export interface RegisterPayload {
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

// LOGIN
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

// REGISTER
export const registerCustomer = async (
    data: RegisterPayload
): Promise<void> => {
    await API.post('/auth/register/customer', {
        email: data.email,
        password: data.password
    });
};

export const registerEmployee = async (
    data: RegisterPayload
): Promise<void> => {
    await API.post('/auth/register/employee', {
        email: data.email,
        password: data.password
    });
};

export const registerDelivery = async (
    data: RegisterPayload
): Promise<void> => {
    await API.post('/auth/register/delivery', {
        email: data.email,
        password: data.password
    });
};
