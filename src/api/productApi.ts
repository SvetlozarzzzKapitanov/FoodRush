import API from './api'
import { Product } from '../types'

export const getAllProducts = async (): Promise<Product[]> => {
    const res = await API.get<Product[]>('/products')
    return res.data
}