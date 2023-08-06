import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '../views/StudentList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/students',
      name: 'student-list',
      component: StudentList
    },
    {
      path: '/teacher',
      name: 'teacher-list',
      component: StudentList
    },
  ]
})

export default router
