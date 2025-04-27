// src/api/authApi.ts
import API from './api'
import { User } from '../types'

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await API.post<LoginResponse>('/auth/login', data);
    return response.data;
}

export const registerCustomer = async (data: LoginRequest): Promise<void> => {
    await API.post('/auth/register/customer', data);
}

export const registerEmployee = async (data: LoginRequest): Promise<void> => {
    await API.post('/auth/register/employee', data);
}

export const registerDelivery = async (data: LoginRequest): Promise<void> => {
    await API.post('/auth/register/delivery', data);
}
