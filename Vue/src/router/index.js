import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'

//import ChartAnalysis from 'components/chart-analysis/more/index'

Vue.use(Router)

const ChartAnalysis = (resolve) => {
  import('components/chart-analysis/more/index').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/chartAnalysis',
          component: ChartAnalysis
        }
      ]
    }
  ]
})
