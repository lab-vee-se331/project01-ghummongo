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
import NotFoundView from "../views/NotFoundView.vue"
import NetworkErrorView from '../views/NetworkErrorView.vue'

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
    {
      path: '/teachers',
      name: 'teacher-list',
      component: StudentList
    },
    {
      path: '/students/setting',
      name: 'student-setting',
      component: StudentSetting
    },
    {

      path : '/student/:id',
      name : 'event-layout',
      component : StudentLayout,
      props: (route) => ({ id: route.params.id }),

      beforeEnter: (to) => {
        const id = to.params.id as string
      useStudentStore().getStudentById(id)
    .then(student => {
        console.log(student);
    })
    .catch(error => {
        console.log(error.message , error.status);
        if (error.status && error.status === 404) {
            router.push({
                name: '404-resource',
                params: { resource: 'student' }
            });
        } else {
            // Handle other errors
            router.push({ name: 'network-error' });
        }
    });
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
    },
    {
      path : '/:catchAll(.*)'
    , name : 'not-found'
    ,component : NotFoundView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path : '/network-error',
      name : 'network-error',
      component : NetworkErrorView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const studentStore = useStudentStore()
  if (studentStore.students.length === 0) {
    await studentStore.fetchAllStudents()
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
