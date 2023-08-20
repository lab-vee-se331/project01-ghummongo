import type { TeacherItem } from "@/type";
import { defineStore } from "pinia";
import TeacherService from "../services/TeacherService";
import { useStudentStore } from "./student";

export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        teachers: [] as TeacherItem[] 
    }),
    getters: {
        getTeachers: (state) => (limit: number, page: number) => {
            const start = (page - 1) * limit;
            const end = start + limit;
            return state.teachers.slice(start, end);
        },
        
        getTeacherById: (state) => (id: string) => {
            return new Promise<TeacherItem | undefined>((resolve, reject) => {
                const teacher = state.teachers.find(teacher => teacher.teacherId === id);
                if (teacher) {
                    resolve(teacher);
                } else {
                    const error = new Error('Teacher not found');
                    // Custom status for the error
                    (error as any).status = 404;
                    reject(error);
                }
            });
        },

        getTeachersLength: (state) => () => {
            return state.teachers.length
        },
        getAllTeachers: (state) => () => {
            return state.teachers;
        },
        getStudentInTeacher: (state) => (id: string) => {
            const studentStore = useStudentStore();
            const teacher = state.teachers.find(teacher => teacher.studentId === id);
            if (teacher) {
                const studentId = teacher.teacherId;
                const student = studentStore.getStudentById(studentId); 
                console.log()
                return student;
            } else {
                return undefined;
            }
        },
    
    }, 
    actions: {
        addTeacher(teacher: TeacherItem) {
            this.teachers.unshift(teacher);
        },
        setTeachers(teachers: TeacherItem[]) {
            this.teachers = teachers;
        },
        deleteTeachers() {
            this.teachers = [];
        },
        async fetchAllTeachers() {
            const response = await TeacherService.getTeachers();
            if (response.status === 200) {
                this.setTeachers(response.data);
            } else {
            }
        },
    }
})
