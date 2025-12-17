import { createRouter, createWebHistory } from 'vue-router'

// 페이지 컴포넌트
import ListView from '../views/list.vue'
import ViewView from '../views/view.vue'

const routes = [
    {
        path: '/',
        redirect: '/list',
    },
  {
    path: '/list',
    name: 'list',
    component: ListView,
  },
  {
    path: '/view',
    name: 'view',
    component: ViewView,
  }
]

const router = createRouter({
  history: createWebHistory('/work_yoon/'),
  routes,
})

export default router