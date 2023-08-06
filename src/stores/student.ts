import type { StudentItem } from "@/type";
import { defineStore } from "pinia";

export const useStudentStore = defineStore('student', {
    state: () => ({
        students: [] as StudentItem[] 
    }),
    actions: {
        addStudent(student: StudentItem) {
            this.students.push(student);
        },
        setStudents(students: StudentItem[]) {
            this.students = students;
        },
        clearStudents() {
            this.students = [];
        }
    }
})
