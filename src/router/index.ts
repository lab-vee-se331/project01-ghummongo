import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '../views/StudentList.vue'
import NProgress from 'nprogress'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/students',
      name: 'student-list',
      component: StudentList,
      props : (route) => ({page: parseInt(route.query?.page as string || '1'),limit: parseInt(route.query?.limit as string || '2')})
    },
    {
      path: '/teacher',
      name: 'teacher-list',
      component: StudentList
    },

  ]
})

router.beforeEach(() => {
  NProgress.start()
  })
  
  router.afterEach(() => {
    NProgress.done()
  })
export default router
