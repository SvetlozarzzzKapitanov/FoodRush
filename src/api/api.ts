import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

// Mock interceptor for /orders/create
API.interceptors.request.use(async config => {
    if (config.method === 'post' && config.url?.includes('/orders/create')) {
        console.log('[Mock] Intercepted order creation:', config.data)
        await new Promise(resolve => setTimeout(resolve, 500)) // simulate delay
        return {
            ...config,
            adapter: () => Promise.resolve({
                data: { message: 'Mock order submitted successfully' },
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
            })
        }
    }
    return config
})

export default API