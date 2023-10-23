import apiClient from './AxiosClient'
import type {  AxiosResponse } from 'axios'
import type { CommentItem } from '@/type'

export default {
  getAllCommentsByStudentId(id: string): Promise<AxiosResponse<CommentItem[]>> {
    return apiClient.get<CommentItem[]>('/comments/student/' + id)
  },
}