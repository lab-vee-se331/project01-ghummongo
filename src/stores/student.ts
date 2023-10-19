import type { StudentItem } from '@/type'
import { defineStore } from 'pinia'
import StudentService from '@/services/StudentService'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [] as StudentItem[]
  }),
  getters: {
    getStudents: (state) => (limit: number, page: number) => {
      const start = (page - 1) * limit
      const end = start + limit
      return state.students.slice(start, end)
    },
    // getStudentsByTeacherId: (state) => async (teacherId: string) => {
    //   const teacherStore = useTeacherStore()
    //   const teacher = teacherStore.getTeacherById(teacherId)

    //   if (!teacher) {
    //     return Promise.resolve([])
    //   }

    //   const students = state.students.filter((student) => student.teacherId === teacherId)
    //   return Promise.resolve(students)
    // },
    getStudentById: (state) => (id: string) => {
      const response = state.students.find((student) => student.id == id)
      console.log(response)
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
    // addStudent(student: StudentItem) {
    //   this.students.unshift(student)
    // },
    setStudents(students: StudentItem[]) {
      this.students = students
    },
    // deleteStudents() {
    //   this.students = []
    // },
    fetchStudent() {
      try {
        return this.students
      } catch (error) {
        console.log(error)
        return null
      }
    },
    // updateStudent(student: StudentItem) {
    //   const index = this.students.findIndex((s) => s.studentId === student.studentId)
    //   if (index !== -1) {
    //     this.students[index] = student
    //   }
    // },
    // updateComment(studentId: string, newComment: string) {
    //   const index = this.students.findIndex((s) => s.studentId === studentId)
    //   if (index !== -1) {
    //     this.students[index].comment = newComment
    //   }
    // },
    async fetchAllStudents() {
      const response = await StudentService.getAllStudents()
      if (response.status === 200) {
        this.setStudents(response.data)
      }
    }
  }
})
