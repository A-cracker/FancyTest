import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPanel from '@/views/MyPanel'
import MyProject from '@/views/MyProject'
import MyToDo from '@/views/MyToDo'
import MyInfo from '@/views/MyInfo'
import MyTask from '@/views/MyTask'
import TheDetail from '@/views/TheDetail'
import MyMessage from '@/views/MyMessage'
import MyProjectList from '@/views/MyProjectList'
import Login from '@/views/Login'
import Register from '@/views/Register'
import MySetting from '@/views/MySetting'
import ThePlan from '@/components/ThePlan';
import TheRequirement from '@/components/TheRequirement';
import TheUseCase from '@/components/TheUseCase';
import TheExecute from '@/components/TheExecute';
import TheBug from '@/components/TheBug';
import TheDoc from '@/components/TheDoc';
import TheChart from '@/components/TheChart';
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Login',
    component: Login
  },
  {
    path:'/register',
    name:'Register',
    component: Register
  },
  {
    path: '/mypanel',
    name: 'MyPanel',
    component: MyPanel
  },
  {
    path: '/thedetail/:id/:type',
    name: 'TheDetail',
    component: TheDetail,
    props:true,
  },
  {
    path: '/mymessage',
    name: 'MyMessage',
    component: MyMessage
  },
  {
    path: '/myproject/:id',
    name: 'MyProject',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MyProject,
    props:true,
    redirect:'/myproject/:id/theplan',
    children:[
      {path:'',redirect:'theplan'},
      {path:'theplan',component:ThePlan},
      {path:'thereq',component:TheRequirement},
      {path:'thebug',component:TheBug},
      {path:'theusecase',component:TheUseCase},
      {path:'theexecute',component:TheExecute},
      {path:'thechart',component:TheChart},
      {path:'thedoc',component:TheDoc}
    ]
  },
  {
    path: '/myprojectlist',
    name: '/MyProjectList',
    component: MyProjectList
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
  {
    path: '/mysetting',
    name: 'MySetting',
    component: MySetting
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
