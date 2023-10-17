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
    async login(username: string, password: string) {
      const response = await apiClient.post('/api/v1/auth/login', {
        username: username,
        password: password
      })
      this.token = response.data.access_token
      this.userRole = response.data.user_role
      localStorage.setItem('access_token', this.token as string)
      localStorage.setItem('user_role', JSON.stringify(this.userRole))
      return response
    },
    async studentRegister(username: string, firstName: string, lastName: string, email: string, password: string) {
      const response = await apiClient.post('/api/v1/auth/register/student', {
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      })
      this.token = response.data.access_token
      this.userRole = response.data.user_role
      localStorage.setItem('access_token', this.token as string)
      localStorage.setItem('user_role', JSON.stringify(this.userRole))
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
    isLoggedIn(): boolean {
      return this.token != null || false;
    },
    isAdmin(): boolean {
      return this.userRole?.includes('ROLE_ADMIN') || false
    },
    isStudent(): boolean {
      return this.userRole?.includes('ROLE_STUDENT') || false
    },
    isTeacher(): boolean {
      return this.userRole?.includes('ROLE_TEACHER') || false
    },
  }
})
