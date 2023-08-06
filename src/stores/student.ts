import type { StudentItem } from "@/type";
import { defineStore } from "pinia";
export const useStudentStore = defineStore('student', {
    state: () => ({
        student : null as StudentItem | null
    }),
    actions : {
        setStudent(student : StudentItem) {
            this.student = student
        }
    }
})