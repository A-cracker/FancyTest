import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPanel from '@/views/MyPanel'
import MyProject from '@/views/MyProject'
import MyToDo from '@/views/MyToDo'
import MyInfo from '@/views/MyInfo'
import MyTask from '@/views/MyTask'
import MyMessage from '@/views/MyMessage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MyPanel',
    component: MyPanel
  },
  {
    path: '/mymessage',
    name: 'MyMessage',
    component: MyMessage
  },
  {
    path: '/myproject',
    name: 'MyProject',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MyProject
  },
  {
    path: '/myinfo',
    name: 'MyInfo',
    component: MyInfo
  },
  {
    path: '/mytask',
    name: 'MyTask',
    component: MyTask
  },
  {
    path: '/mytodo',
    name: 'MyToDo',
    component: MyToDo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
