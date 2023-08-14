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
            return new Promise<StudentItem | undefined>((resolve, reject) => {
                const student = state.students.find(student => student.studentId === id);
                if (student) {
                    resolve(student);
                } else {
                    const error = new Error('Student not found');
                    // Custom status for the error
                    (error as any).status = 404;
                    reject(error);
                }
            });
        },

        getStudentsLength: (state) => () => {
            return state.students.length
        },
        getAllStudents: (state) => () => {
            return state.students;
        },
    
    }, 
    actions: {
        addStudent(student: StudentItem) {
            this.students.unshift(student);
        },
        setStudents(students: StudentItem[]) {
            this.students = students;
        },
        deleteStudents() {
            this.students = [];
        },
        updateStudent(student: StudentItem) {
            const index = this.students.findIndex(s => s.studentId === student.studentId);
            if (index !== -1) {
                this.students[index] = student;
            }
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
