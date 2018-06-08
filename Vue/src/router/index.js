import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
//import news from ''

//import ChartAnalysis from 'components/chart-analysis/more/index'

Vue.use(Router)

// TODO 因为直接import，url中带‘-’解析不了，则用回调
// 这里就不用for遍历json配置项了，保持代码可读性

const moneyItemInfo = (resolve) => {
  import('components/money-item/info/index').then((module) => {
    resolve(module)
  })
}
const myOrderItem = (resolve) => {
  import('components/my-order-item/index').then((module) => {
    resolve(module)
  })
}
const myOrderItemDet = (resolve) => {
  import('components/my-order-item/det/index').then((module) => {
    resolve(module)
  })
}
const moneyItemInfoPay = (resolve) => {
  import('components/money-item/info/pay/index').then((module) => {
    resolve(module)
  })
}
//const moneyItemInfoType = (resolve) => {
//import('components/money-item/info/pay/type').then((module) => {
//  resolve(module)
//})
//}
const moneyItemInfoPayUnion = (resolve) => {
  import('components/money-item/info/pay/union/index').then((module) => {
    resolve(module)
  })
}
//const MenuItemStages = (resolve) => {
//import('components/menu-item/stages/index').then((module) => {
//  resolve(module)
//})
//}
//const MenuItemShop = (resolve) => {
//import('components/menu-item/shop/index').then((module) => {
//  resolve(module)
//})
//}
//const MenuItemCar = (resolve) => {
//import('components/menu-item/car/index').then((module) => {
//  resolve(module)
//})
//}
//const MenuItemCard = (resolve) => {
//import('components/menu-item/card/index').then((module) => {
//  resolve(module)
//})
//}
//const ChartAnalysisMore = (resolve) => {
//import('components/chart-analysis/more/index').then((module) => {
//  resolve(module)
//})
//}
//const MyCommission = (resolve) => {
//import('components/my/commission/index').then((module) => {
//  resolve(module)
//})
//}
//const MyCommissionRule = (resolve) => {
//import('components/my/commission/rule/index').then((module) => {
//  resolve(module)
//})
//}
//const MyCommissionTask = (resolve) => {
//import('components/my/commission/task/index').then((module) => {
//  resolve(module)
//})
//}
//const MyCommissionMore = (resolve) => {
//import('components/my/commission/more/index').then((module) => {
//  resolve(module)
//})
//}
//const MyCommissionMoreDet = (resolve) => {
//import('components/my/commission/more/det/index').then((module) => {
//  resolve(module)
//})
//}
//const MyCommissionTaskDet = (resolve) => {
//import('components/my/commission/task/det/index').then((module) => {
//  resolve(module)
//})
//}
//const MyTask = (resolve) => {
//import('components/my/task/index').then((module) => {
//  resolve(module)
//})
//}
//const Mews = (resolve) => {
//import('components/news/news').then((module) => {
//  resolve(module)
//})
//}
//const Problem = (resolve) => {
//import('components/problem/index').then((module) => {
//  resolve(module)
//})
//}
//const About = (resolve) => {
//import('components/about/index').then((module) => {
//  resolve(module)
//})
//}

export default new Router({
  routes: [
    {
      path: '/',
//    component: Index,
      component: Index,
      children: [
        {
          path: 'moneyItem_info',
          component: moneyItemInfo,
          children: [
            {
              path: 'pay',
              component: moneyItemInfoPay,
              children: [
                {
                  path: 'union',
                  component: moneyItemInfoPayUnion
                }
              ]
            }
          ]
        }, {
          path: 'myOrder_item',
          component: myOrderItem,
          children: [
            {
              path: 'det',
              component: myOrderItemDet
            }
          ]
        }
      ]
//    children: [
//      {
//        path: 'menuItem_stages', // 头部item列表
//        component: MenuItemStages
//      }, {
//        path: 'menuItem_shop',
//        component: MenuItemShop
//      }, {
//        path: 'menuItem_car',
//        component: MenuItemCar
//      }, {
//        path: 'menuItem_card',
//        component: MenuItemCard
//      }, {
//        path: 'menuItem_more',
//        component: MenuItemMore
//      }, {
//        path: 'chartAnalysisMore', // 中部图表
//        component: ChartAnalysisMore
//      }, {
//        path: 'my_commission', // 底部item列表
//        component: MyCommission,
//        children: [
//          {
//            path: 'rule',
//            component: MyCommissionRule
//          }, {
//            path: 'more',
//            component: MyCommissionMore,
//            children: [
//              {
//                path: 'det',
//                component: MyCommissionMoreDet
//              }
//            ]
//          }, {
//            path: 'task',
//            component: MyCommissionTask,
//            children: [
//              {
//                path: 'det',
//                component: MyCommissionTaskDet
//              }
//            ]
//          }
//        ]
//      }, {
//        path: 'my_task',
//        component: MyTask
//      }, {
//        path: 'news', // 左上角menu菜单列表
//        component: Mews
//      }, {
//        path: 'problem',
//        component: Problem
//      }, {
//        path: 'about',
//        component: About
//        
//      }
//    ]
    }
  ]
})
