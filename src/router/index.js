import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CourseDetail from '../views/Course.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import AddCourse from '../views/AddCourse.vue'
import EditCourse from '../views/EditCourse.vue'
import AddLecture from '../views/AddLecture.vue'
import AllCourses from '../views/AllCourses.vue'
import notFound from '../views/notFound.vue'

import store from '../store/index.js'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/courses',
    name: 'view-all-courses',
    component: AllCourses
  },
  {
    path: '/course/:id',
    name: 'course-detail',
    component: CourseDetail,
    props: true
  },
  {
    path: '/course/:id/edit',
    name: 'course-edit',
    component: EditCourse,
    props: true,
    meta: {
      loggedIn: true,
      admin: true
    }
  },
  {
    path: '/course/:id/lecture',
    name: 'course-add-lecture',
    component: AddLecture,
    props: true,
    meta: {
      loggedIn: true,
      admin: true
    }
  },
  {
    path: '/course/add',
    name: 'course-add',
    component: AddCourse,
    meta: {
      admin: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/:notFound(.*)',
    name: 'notFound ',
    component: notFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, __, next) => {
  const isAdmin = store.getters.isAdmin;
  if(to.meta.admin && !isAdmin){
    next('/')
  } else {
    next()
  }
})

export default router
