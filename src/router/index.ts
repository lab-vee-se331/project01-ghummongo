// ----- Package -----
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

// ----- Home -----
import HomePage from '@/views/HomeView.vue'

// ----- Event Handling -----
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'

// ----- Student -----
import StudentEdit from '../views/student/StudentEdit.vue'
import StudentDetail from '../views/student/StudentDetail.vue'
import StudentLayout from '../views/student/StudentLayout.vue'
import StudentList from '../views/student/StudentList.vue'

// ----- Teacher -----
import TeacherDetail from '../views/teacher/TeacherDetail.vue'
import TeacherLayout from '../views/teacher/TeacherLayout.vue'
import TeacherList from '../views/teacher/TeacherList.vue'

// ----- Setting -----
import TeacherSetting from '../views/setting/TeacherSetting.vue'
import StudentSetting from '../views/setting/StudentSetting.vue'

// ----- Store & Service -----
import { useTeacherStore } from '../stores/teacher'
import { useStudentStore } from '../stores/student'
// import StudentService from '../services/StudentService'

// ----- Announcement -----
import CreateAnnouncementView from '../views/announcement/CreateAnnouncementView.vue'
import AnnouncementView from '../views/announcement/AnnouncementView.vue'

// ----- Auth -----
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

// ----- Profile -----
import ProfileView from '../views/profile/ProfileView.vue'
import ProfileLayout from '@/views/profile/ProfileLayout.vue'
import ProfileDetail from '@/views/profile/ProfileDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },

    // ----- Profile -----
    {
      path: '/profile',
      name: 'profile-page',
      component: ProfileView
    },
    {
      path: '/profile/:id',
      name: 'profile-layout',
      component: ProfileLayout,
      props: (route) => ({ id: route.params.id }),
      beforeEnter: () => {
        const id = localStorage.getItem('user_id') as string
        useStudentStore()
          .getStudentById(id)
          .catch((error) => {
            if (error.status && error.status === 404) {
              router.push({
                name: '404-resource',
                params: { resource: 'student' }
              })
            }
          })
        if (!navigator.onLine) {
          router.push({ name: 'network-error' })
        }
      },
      children: [
        {
          path: '',
          name: 'profile-detail',
          component: ProfileDetail
        }
      ]
    },

    // ----- Announcement -----
    {
      path: '/create-announcement',
      name: 'create-announcement-page',
      component: CreateAnnouncementView
    },
    {
      path: '/announcement',
      name: 'announcement-page',
      component: AnnouncementView
    },
    {
      path: '/announcement',
      name: 'announcement-list',
      component: AnnouncementView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        limit: parseInt((route.query?.limit as string) || '6')
      })
    },

    // ----- Auth -----
    {
      path: '/login',
      name: 'login-page',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register-page',
      component: RegisterView
    },

    // ----- Student's Route -----
    {
      path: '/students',
      name: 'student-list',
      component: StudentList,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        limit: parseInt((route.query?.limit as string) || '6')
      })
    },
    {
      path: '/students/setting',
      name: 'student-setting',
      component: StudentSetting
    },
    {
      path: '/student/:id',
      name: 'student-layout',
      component: StudentLayout,
      props: (route) => ({ id: route.params.id }),

      beforeEnter: (to) => {
        const id = to.params.id as string
        useStudentStore()
          .getStudentById(id)
          .catch((error) => {
            if (error.status && error.status === 404) {
              router.push({
                name: '404-resource',
                params: { resource: 'student' }
              })
            }
          })
        if (!navigator.onLine) {
          router.push({ name: 'network-error' })
        }
      },
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetail
        },
        {
          path: 'edit',
          name: 'student-edit',
          component: StudentEdit
        }
      ]
    },

    // ----- End Student's Route -----

    // ----- Teacher's Route -----
    {
      path: '/teachers',
      name: 'teacher-list',
      component: TeacherList,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        limit: parseInt((route.query?.limit as string) || '6')
      })
    },
    {
      path: '/teachers/setting',
      name: 'teacher-setting',
      component: TeacherSetting
    },
    {
      path: '/teacher/:id',
      name: 'teacher-layout',
      component: TeacherLayout,
      props: (route) => ({ id: route.params.id }),
      beforeEnter: (to) => {
        const id = to.params.id as string
        useTeacherStore()
          .getTeacherById(id)
          .catch((error) => {
            if (error.status && error.status === 404) {
              router.push({
                name: '404-resource',
                params: { resource: 'teacher' }
              })
            }
          })
      },
      children: [
        {
          path: '',
          name: 'teacher-detail',
          component: TeacherDetail
        }
      ]
    },
    // ----- End Teacher's Route -----

    // ----- Event Handling Route -----
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }

    // ----- End Event Handling Route ----
  ]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const studentStore = useStudentStore()
  if (studentStore.students.length === 0) {
    await studentStore.fetchAllStudents()
  }

  // const teacherStore = useTeacherStore()
  // if (teacherStore.teachers.length === 0) {
  //   await teacherStore.fetchAllTeachersByPage(3, 1)
  // }
  const teacherStore = useTeacherStore()
  if (teacherStore.teachers.length === 0) {
    await teacherStore.fetchAllTeachers()
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
