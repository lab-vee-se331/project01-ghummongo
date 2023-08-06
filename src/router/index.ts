import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '../views/StudentList.vue'
import NProgress from 'nprogress'
import StudentLayout from '../views/StudentLayout.vue'
import StudentDetail from '../views/student/StudentDetail.vue'
import StudentEdit from '../views/student/StudentEdit.vue'
import StudentService from '@/services/StudentService'
import { useStudentStore } from '@/stores/student'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/students',
      name: 'student-list',
      component: StudentList,
      props : (route) => ({page: parseInt(route.query?.page as string || '1'),limit: parseInt(route.query?.limit as string || '3')})
    },
    {
      path: '/teachers',
      name: 'teacher-list',
      component: StudentList
    },
    {
      path : '/event/:id',
      name : 'event-layout',
      component : StudentLayout,
      beforeEnter: (to) => {
        const id =  to.params.id as string
        const studentStore = useStudentStore().getStudentById(id)
    console.log(studentStore);
            
          // if (Array.isArray(response.data) && response.data.length > 0) {
          //   studentStore.setStudents(response.data[0]) // Set the first item of the response data array
          // } else {
          // }
        // Save student to route's meta data

        // .catch((error) => {
        //   if (error.response && error.response.status === 404) {
        //     return {
        //       name : '404-resource'
        //       ,params: { resource : 'event'}
        //     }
        //   } else {
        //     return { name : 'network-error'}
        //   }
        // })
      }
      ,
      children : [
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

        },
      ]
    },

  ]
})

router.beforeEach(async (to, from, next) => {
  const studentStore = useStudentStore()
  if (studentStore.students.length === 0) {
    await studentStore.fetchAllStudents();
  }
  next();
});

router.beforeEach(() => {
  NProgress.start()
  })
  
  router.afterEach(() => {
    NProgress.done()
  })
export default router
