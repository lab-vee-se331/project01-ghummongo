import type { StudentItem } from "@/type";
import { defineStore } from "pinia";
import StudentService from "../services/StudentService";

export const useStudentStore = defineStore('student', {
    state: () => ({
        students: [] as StudentItem[] 
    }),
    getters: {
        getStudents: (state) => (limit: number, page: number) => {
            const start = (page - 1) * limit;
            const end = start + limit;
            return state.students.slice(start, end);
        },
        
        getStudentById: (state) => (id: string) => {
            return state.students.find(student => student.studentId === id);
        },

        getStudentsLength: (state) => () => {
            return state.students.length
        }
    },
    actions: {
        addStudent(student: StudentItem) {
            this.students.push(student);
        },
        setStudents(students: StudentItem[]) {
            this.students = students;
        },
        deleteStudents() {
            this.students = [];
        },
        async fetchAllStudents() {
            const response = await StudentService.getStudents();
            if (response.status === 200) {
                this.setStudents(response.data);
            } else {
            }
        },
    }
})
