import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '../views/StudentList.vue'
import NProgress from 'nprogress'
import HomePage from '../views/HomeView.vue'
import StudentLayout from '../views/StudentLayout.vue'
import StudentDetail from '../views/student/StudentDetail.vue'
import StudentEdit from '../views/student/StudentEdit.vue'
// import StudentService from '@/services/StudentService'
import { useStudentStore } from '@/stores/student'
import StudentSetting from '../views/StudentSetting.vue'

import TeacherList from '../views/TeacherList.vue'
import TeacherLayout from '../views/TeacherLayout.vue'
import TeacherDetail from '../views/teacher/TeacherDetail.vue'
import { useTeacherStore } from '@/stores/teacher'
// import TeacherSetting from '../views/TeacherSetting.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/students',
      name: 'student-list',
      component: StudentList,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        limit: parseInt((route.query?.limit as string) || '5')
      })
    },
    // {
    //   path: '/teacher',
    //   name: 'teacher-list',
    //   component: TeacherList,
    //   props: (route) => ({
    //     page: parseInt((route.query?.page as string) || '1'),
    //     limit: parseInt((route.query?.limit as string) || '5')
    //   })
    // },
    {
      path: '/teachers',
      name: 'teacher-list',
      component: TeacherList
    },
    {
      path: '/students/setting',
      name: 'student-setting',
      component: StudentSetting
    }, 
    // {
    //   path: '/teacher/setting',
    //   name: 'teacher-setting',
    //   component: TeacherSetting
    // },
    {
      path : '/student/:id',
      name : 'student-layout',
      component : StudentLayout,

      beforeEnter: (to) => {
        const id = to.params.id as string
        const studentStore = useStudentStore().getStudentById(id)
        console.log(studentStore)
      },
      children: [
        {
          path: '',
          name: 'student-detail',

          component: StudentDetail,
          props: (route) => ({ oneStudent: useStudentStore().getStudentById(route.params.id) })
        },
        {
          path: 'edit',
          name: 'student-edit',
          component: StudentEdit,
          props: (route) => ({ oneStudent: useStudentStore().getStudentById(route.params.id) })
        }
      ]
    }, {
      path : '/teachers/:id',
      name : 'teacher-layout',
      component : TeacherLayout,

      beforeEnter: (to) => {
        const id = to.params.id as string
        const teacherStore = useTeacherStore().getTeacherById(id)
        console.log(teacherStore)
      },
      children: [
        {
          path: '',
          name: 'teacher-detail',

          component: TeacherDetail,
          props: (route) => ({ oneStudent: useStudentStore().getStudentById(route.params.id) })
        },
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const studentStore = useStudentStore()
  const teacherStore = useTeacherStore()
  if (studentStore.students.length === 0) {
    await studentStore.fetchAllStudents()
  }
  if (teacherStore.teachers.length === 0) {
    await teacherStore.fetchAllTeachers()
  }
  next()
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
