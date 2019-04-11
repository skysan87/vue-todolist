import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/TodoList'
import Kanban from '@/components/Kanban'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/kanban',
      name: 'Kanban',
      component: Kanban
    }
  ]
})
