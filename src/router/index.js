import Vue from 'vue'
import Router from 'vue-router'
import MainForm from '@/components/MainForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainForm',
      component: MainForm
    }
  ]
})
