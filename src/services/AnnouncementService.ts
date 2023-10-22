import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { AnnouncementItem } from '@/type'

export default {
  getAnnouncements(perPage: number, page: number): Promise<AxiosResponse<AnnouncementItem[]>> {
    return apiClient.get<AnnouncementItem[]>('/announcements?_limit=' + perPage + '&_page=' + page)
  },
  getAllAnnouncements(): Promise<AxiosResponse<AnnouncementItem[]>> {
    return apiClient.get<AnnouncementItem[]>('/announcements/')
  },
  getAnnouncementById(id: string): Promise<AxiosResponse<AnnouncementItem>> {
    return apiClient.get<AnnouncementItem>('/announcements/' + id)
  },
}
