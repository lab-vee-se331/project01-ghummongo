// ----- Package -----
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

// ----- Home -----
import HomePage from '@/views/HomeView.vue'

// ----- Event Handling -----
import NotFoundView from "@/views/NotFoundView.vue"
import NetworkErrorView from '@/views/NetworkErrorView.vue'

// ----- Student -----
import { 
  StudentList, StudentLayout, StudentDetail, StudentEdit 
} from '@/views/student';

// ----- Teacher -----
import {
  TeacherList, TeacherLayout, TeacherDetail
} from '@/views/teacher';

// ----- Setting -----
import {
  StudentSetting, TeacherSetting
} from '@/views/setting';

// ----- Store & Service-----
import { useTeacherStore } from '@/stores/teacher'
import { useStudentStore } from '@/stores/student'
import StudentService from '../services/StudentService'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },

    // ----- Student's Route -----
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
      path: '/students/setting',
      name: 'student-setting',
      component: StudentSetting
    },   
    {
      path : '/student/:id',
      name : 'student-layout',
      component : StudentLayout,
      props: (route) => ({ id: route.params.id }),

      beforeEnter: (to) => {
        const id = to.params.id as string
      useStudentStore().getStudentById(id)
    .catch(error => {
        if (error.status && error.status === 404) {
            router.push({
                name: '404-resource',
                params: { resource: 'student'}
            });
        } 
    });
    if (!navigator.onLine ) {
      router.push({ name: 'network-error' });
  }
    // useStudentStore().getStudentById(id)
    // .catch(error => {
    //  if (error.response && error.response.status === 404) {
    //         router.push({
    //             name: '404-resource',
    //             params: { resource: 'student', id : id }
    //         });
    //     } 
    // });
      },
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetail,
        },
        {
          path: 'edit',
          name: 'student-edit',
          component: StudentEdit,
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
        limit: parseInt((route.query?.limit as string) || '5')
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
        const id = to.params.id as string;
        useTeacherStore().getTeacherById(id)
          .catch(error => {
            if (error.status && error.status === 404) {
                router.push({
                    name: '404-resource',
                    params: { resource: 'teacher' }
                });
            }
          });
      },
      children: [
        {
          path: '',
          name: 'teacher-detail',
          component: TeacherDetail,
        }
      ]
    },  
  // ----- End Teacher's Route -----
 

  // ----- Event Handling Route -----
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

// ----- End Event Handling Route ----

  ]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const studentStore = useStudentStore();
  if (studentStore.students.length === 0) {
      await studentStore.fetchAllStudents();
  }

  const teacherStore = useTeacherStore();
  if (teacherStore.teachers.length === 0) {
      await teacherStore.fetchAllTeachers();
  }

  next();
});

router.afterEach(() => {
  NProgress.done()
})

export default router
