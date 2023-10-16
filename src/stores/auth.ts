import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    userRole: null as string[] | null
  }),
  getters: {
    currentUserName(): string {
      return ''
    }
  },

  actions: {
    async login(email: string, password: string) {
      const response = await apiClient.post('/api/v1/auth/authenticate', {
        username: email,
        password: password
      })
      this.token = response.data.access_token
      this.userRole = response.data.user_role
      localStorage.setItem('access_token', this.token as string)
      localStorage.setItem('user_role', JSON.stringify(this.userRole))
      return response
    },
    async studentRegister(username: string, firstName: string, lastName: string, email: string, password: string) {
      const response = await apiClient.post('/api/v1/auth/register', {
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      })
      this.token = response.data.access_token
      // this.userRole = response.data.user_role
      localStorage.setItem('access_token', this.token as string)
      // localStorage.setItem('user_role', JSON.stringify(this.userRole))
      return response
    },
    logout() {
      console.log('logout')
      this.token = null
      this.userRole = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_role')
    },
    reload(token: string, userRole: string[]) {
      this.token = token
      this.userRole = userRole
    },
    isAdmin(): boolean {
      return this.userRole?.includes('ROLE_ADMIN') || false
    }
  }
})
