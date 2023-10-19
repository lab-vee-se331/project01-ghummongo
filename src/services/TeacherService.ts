import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { TeacherItem } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1",
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getTeachers(perPage: number, page: number): Promise<AxiosResponse<TeacherItem[]>> {
    return apiClient.get<TeacherItem[]>('/teachers?_limit=' + perPage + '&_page=' + page)
  },
  getAllTeachers(): Promise<AxiosResponse<TeacherItem[]>> {
    return apiClient.get<TeacherItem[]>('/teachers')
  },
}