import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardDetail from '../views/BoardDetail.vue'
import CreateBoard from '../views/CreateBoard.vue'
import ModifyBoard from '../views/ModifyBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateBoard
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: BoardDetail
    },
    {
      path: '/modify/:id',
      name: 'modify',
      component: ModifyBoard
    }
  ]
})

export default router
