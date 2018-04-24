import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestThrone from '@/components/testThrone'
import TestBatchTask from '@/components/testBatchTask'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/testThrone',
      name: 'testThrone',
      component: TestThrone
    },
    {
      path: '/batchTask',
      name: 'TestBatchTask',
      component: TestBatchTask
    }
  ]
})
