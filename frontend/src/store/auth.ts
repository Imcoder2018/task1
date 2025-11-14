import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  avatar?: string
  isEmailVerified: boolean
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  setAuth: (user: User, tokens: { accessToken: string; refreshToken: string }) => void
  clearAuth: () => void
  setLoading: (loading: boolean) => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, tokens) => {
        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
          isLoading: false,
        })
        
        // Store tokens in localStorage for API interceptor
        localStorage.setItem('accessToken', tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        })
        
        // Clear tokens from localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      },

      setLoading: (isLoading) => {
        set({ isLoading })
      },

      updateUser: (updatedUser) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...updatedUser }
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
