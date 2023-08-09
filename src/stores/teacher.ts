import type { TeacherItem } from "@/type";
import { defineStore } from "pinia";
import TeacherService from "../services/TeacherService";

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
            return state.teachers.find(teacher => teacher.teacherId === id);
        },

        getTeachersLength: (state) => () => {
            return state.teachers.length
        },
        getAllTeachers: (state) => () => {
            return state.teachers;
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
