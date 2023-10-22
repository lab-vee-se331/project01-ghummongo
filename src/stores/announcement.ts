import { defineStore } from 'pinia'
import AnnouncementService from '@/services/AnnouncementService'
import type { AnnouncementItem } from '@/type'

export const useAnnouncementStore = defineStore('announcement', {
  state: () => ({
    announcements: [] as AnnouncementItem[]
  }),
  getters: {
    getAnnouncements: (state) => async (limit: number, page: number) => {
      const response = await AnnouncementService.getAllAnnouncements()
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
    }
  }
})
