import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CourseDetail from '../views/Course.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import AddCourse from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/testing',
    name: 'testing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "testing" */ '../views/Testing.vue')
  },
  {
    path: '/course/:slug',
    name: 'course-detail',
    component: CourseDetail,
    props: true
  },
  {
    path: '/course/add',
    name: 'course-add',
    component: AddCourse
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
