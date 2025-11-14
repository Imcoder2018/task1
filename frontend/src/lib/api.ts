import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try to refresh token
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const response = await api.post('/api/auth/refresh', {
            refreshToken,
          })
          const { accessToken } = response.data.data.tokens
          localStorage.setItem('accessToken', accessToken)
          
          // Retry the original request
          error.config.headers.Authorization = `Bearer ${accessToken}`
          return api.request(error.config)
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/auth/login'
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API functions
export const authAPI = {
  register: (data: any) => api.post('/api/auth/register', data),
  login: (data: any) => api.post('/api/auth/login', data),
  logout: () => api.post('/api/auth/logout'),
  getMe: () => api.get('/api/auth/me'),
  forgotPassword: (email: string) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => 
    api.post('/api/auth/reset-password', { token, password }),
  changePassword: (currentPassword: string, newPassword: string) => 
    api.post('/api/auth/change-password', { currentPassword, newPassword }),
  verifyEmail: (token: string) => api.get(`/api/auth/verify-email/${token}`),
  resendVerification: () => api.post('/api/auth/resend-verification'),
}

// Health check
export const healthCheck = () => api.get('/health')
