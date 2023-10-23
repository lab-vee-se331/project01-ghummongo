import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { CommentItem } from '@/type'
import CommentService from '@/services/CommentService'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [] as CommentItem[]
  }),
  getters: {
    getCommentById: (state) => async (id: string) => {
      const comments = await CommentService.getAllCommentsByStudentId(id)
      state.comments = comments.data
      const response = state.comments
      return new Promise<CommentItem[]>((resolve) => {
        resolve(response || null)
      })
    }
  },
  actions: {
    setComments(comments: CommentItem[]) {
      this.comments = comments
    },
    async fetchAllCommentsByStudentId(id: string) {
      const response = await CommentService.getAllCommentsByStudentId(id)
      console.log(response.data)
      this.setComments(response.data)
    },
    async replyComment(id: string, content: string, sid: string, tid: string) {
      const response = await apiClient.post(`/api/v1/comments/reply?studentId=${sid}&teacherId=${tid}&commentId=${id}`, {
        content: content
      })
      return response
    },
    async createComment(content: string, sid: string, tid: string, teacherImage: string) {
      const response = await apiClient.post(`/api/v1/comments/create?studentId=${sid}&teacherId=${tid}`, {
        content: content,
        teacherImage: teacherImage
      })
      return response
    }
  }
})
