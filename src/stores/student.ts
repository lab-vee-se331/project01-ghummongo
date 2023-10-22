import type { StudentItem } from '@/type'
import { defineStore } from 'pinia'
import StudentService from '@/services/StudentService'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [] as StudentItem[]
  }),
  getters: {
    getStudents: (state) => async (limit: number, page: number) => {
      const response = await StudentService.getAllStudents()
      state.students = response.data
      const start = (page - 1) * limit
      const end = start + limit
      return state.students.slice(start, end)
    },
    getStudentById: (state) => async (id: string) => {
      const students = await StudentService.getStudentsById(id)
      // const students = await StudentService.getAllStudents()
      state.students = students.data
      // return state.students
      const response = state.students
      return new Promise<StudentItem | null>((resolve) => {
        resolve(response || null)
      })
    },
    getStudentsLength: (state) => () => {
      return state.students.length
    },
    getAllStudents: (state) => () => {
      return state.students
    }
  },
  actions: {
    setStudents(students: StudentItem[]) {
      this.students = students
    },
    fetchStudent() {
      try {
        return this.students
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async fetchAllStudentsByPage(perPage: number, page: number) {
      const response = await StudentService.getStudents(perPage, page)
      console.log(response.data)
      this.setStudents(response.data)
    },
    async fetchAllStudents() {
      const response = await StudentService.getAllStudents()
      if (response.status === 200) {
        this.setStudents(response.data)
      }
    }
  }
})
