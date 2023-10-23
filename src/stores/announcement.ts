import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import AnnouncementService from '@/services/AnnouncementService'
import type { AnnouncementItem } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useAnnouncementStore = defineStore('announcement', {
  state: () => ({
    announcements: [] as AnnouncementItem[]
  }),
  getters: {
    getAnnouncements: (state) => async (limit: number, page: number) => {
      const response = await AnnouncementService.getAllAnnouncements()
      console.log(response.data);
      state.announcements = response.data
      const start = (page - 1) * limit
      const end = start + limit
      return state.announcements.slice(start, end)
    },
    getAnnouncementById: (state) => async (id: string) => {
      const announcements = await AnnouncementService.getAllAnnouncements()
      state.announcements = announcements.data
      const response = state.announcements.find((announcement) => String(announcement.id) === id);

      return new Promise<AnnouncementItem | null>((resolve) => {
        resolve(response || null)
      })
    },
    getAnnouncementsLength: (state) => () => {
      return state.announcements.length
    },
    getAllAnnouncements: (state) => () => {
      return state.announcements
    }
  },
  actions: {
    setAnnouncements(announcements: AnnouncementItem[]) {
      this.announcements = announcements
    },
    fetchAnnouncement() {
      try {
        return this.announcements
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async fetchAllAnnouncementsByPage(perPage: number, page: number) {
      const response = await AnnouncementService.getAnnouncements(perPage, page)
      console.log(response.data)
      this.setAnnouncements(response.data)
    },
    async fetchAllAnnouncements() {
      const response = await AnnouncementService.getAllAnnouncements()
      if (response.status === 200) {
        this.setAnnouncements(response.data)
      }
    },
    async createAnnouncement(title: string, description: string, images: string[], tid: string) {
      const response = await apiClient.post(`/api/v1/announcements?teacherId=${tid}`, {
        title: title,
        description: description,
        images: images
      })
      return response
    },
  }
})
