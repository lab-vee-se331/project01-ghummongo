import type { TeacherItem } from '@/type'
import { defineStore } from 'pinia'
import TeacherService from '@/services/TeacherService'

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    teachers: [] as TeacherItem[]
  }),
  getters: {
    getTeachers: (state) => async (perPage: number, page: number) => {
      const response = await TeacherService.getAllTeachers()
      state.teachers = response.data
      const startIndex = (page - 1) * perPage
      const endIndex = startIndex + perPage
      return state.teachers.slice(startIndex, endIndex)
    },
    getTeacherById: (state) => async (id: string) => {
      // const response = state.teachers.find((teacher) => teacher.id == id)
      // console.log(response)
      // return new Promise<TeacherItem | null>((resolve) => {
      //   resolve(response || null)
      // })
      const teachers = await TeacherService.getTeachersById(id)
      state.teachers = teachers.data
      const response = state.teachers
      return new Promise<TeacherItem | null>((resolve) => {
        resolve(response || null)
      })
    },
    getTeachersLength: (state) => () => {
      console.log('L: ' + state.teachers.length)
      return state.teachers.length
    },
    getAllTeachers: (state) => () => {
      return state.teachers
    }
  },
  actions: {
    setTeacher(teachers: TeacherItem[]) {
      this.teachers = teachers
    },
    fetchTeachers() {
      try {
        return this.teachers
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async fetchAllTeachers() {
      try {
        const response = await TeacherService.getAllTeachers()
        this.setTeacher(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAllTeachersByPage(perPage: number, page: number) {
      const response = await TeacherService.getTeachers(perPage, page)
      console.log(response.data)
      this.setTeacher(response.data)
    },
    async fetchTeacherById(id: string) {
      try {
        const response = this.getTeacherById(id)
        // console.log(response)
        return response
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }
})
