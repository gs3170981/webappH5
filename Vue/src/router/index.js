import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
//import news from ''

//import ChartAnalysis from 'components/chart-analysis/more/index'

Vue.use(Router)

// TODO 因为直接import，url中带‘-’解析不了，并且可能会被模块化调用（h5嵌入）则用回调
// 这里就不用for遍历json配置项了，保持代码可读性

const MenuItemMore = (resolve) => {
  import('components/menu-item/more/index').then((module) => {
    resolve(module)
  })
}
const MenuItemStages = (resolve) => {
  import('components/menu-item/stages/index').then((module) => {
    resolve(module)
  })
}
const MenuItemStagesDet = (resolve) => {
  import('components/menu-item/stages/det/index').then((module) => {
    resolve(module)
  })
}
const MenuItemShop = (resolve) => {
  import('components/menu-item/shop/index').then((module) => {
    resolve(module)
  })
}
const MenuItemCar = (resolve) => {
  import('components/menu-item/car/index').then((module) => {
    resolve(module)
  })
}
const MenuItemCard = (resolve) => {
  import('components/menu-item/card/index').then((module) => {
    resolve(module)
  })
}
const ChartAnalysisMore = (resolve) => {
  import('components/chart-analysis/more/index').then((module) => {
    resolve(module)
  })
}
const MyCommission = (resolve) => {
  import('components/my/commission/index').then((module) => {
    resolve(module)
  })
}
const MyCommissionRule = (resolve) => {
  import('components/my/commission/rule/index').then((module) => {
    resolve(module)
  })
}
const MyCommissionAskMoney = (resolve) => {
  import('components/my/commission/ask-money/index').then((module) => {
    resolve(module)
  })
}
const MyCommissionAskMoneyHistory = (resolve) => {
  import('components/my/commission/ask-money/child/history').then((module) => {
    resolve(module)
  })
}
const MyCommissionAskMoneyHistoryDet = (resolve) => {
  import('components/my/commission/ask-money/child/det/index').then((module) => {
    resolve(module)
  })
}
const MyCommissionAskMoneyFlow = (resolve) => {
  import('components/my/commission/ask-money/child/flow').then((module) => {
    resolve(module)
  })
}
const MyCommissionAskMoneyTiedCard = (resolve) => {
  import('components/my/commission/ask-money/tied-card').then((module) => {
    resolve(module)
  })
}
const MyCommissionAskMoneyTiedCardResult = (resolve) => {
  import('components/my/commission/ask-money/child/tied-result').then((module) => {
    resolve(module)
  })
}
const MyCommissionTask = (resolve) => {
  import('components/my/commission/task/index').then((module) => {
    resolve(module)
  })
}
const MyCommissionMore = (resolve) => {
  import('components/my/commission/more/index').then((module) => {
    resolve(module)
  })
}
const MyCommissionMoreDet = (resolve) => {
  import('components/my/commission/more/det/index').then((module) => {
    resolve(module)
  })
}
const MyCommissionTaskDet = (resolve) => {
  import('components/my/commission/task/det/index').then((module) => {
    resolve(module)
  })
}
const MyTask = (resolve) => {
  import('components/my/task/index').then((module) => {
    resolve(module)
  })
}
const Mews = (resolve) => {
  import('components/news/index').then((module) => {
    resolve(module)
  })
}
const MewsDet_Act = (resolve) => {
  import('components/news/det/act/index').then((module) => {
    resolve(module)
  })
}
const Problem = (resolve) => {
  import('components/problem/index').then((module) => {
    resolve(module)
  })
}
const Problem_Pic = (resolve) => {
  import('components/problem/pic/index').then((module) => {
    resolve(module)
  })
}
const About = (resolve) => {
  import('components/about/index').then((module) => {
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
          path: 'menuItem_stages', // 头部item列表
          component: MenuItemStages,
          children: [
            {
              path: 'det',
              component: MenuItemStagesDet,
            }
          ]
        }, {
          path: 'menuItem_shop',
          component: MenuItemShop
        }, {
          path: 'menuItem_car',
          component: MenuItemCar
        }, {
          path: 'menuItem_card',
          component: MenuItemCard
        }, {
          path: 'menuItem_more',
          component: MenuItemMore
        }, {
          path: 'chartAnalysisMore', // 中部图表
          component: ChartAnalysisMore
        }, {
          path: 'my_commission', // 底部item列表
          component: MyCommission,
          children: [
            {
              path: 'ask_money', // 绑卡成功的
              component: MyCommissionAskMoney,
              children: [
                {
                  path: 'history',
                  component: MyCommissionAskMoneyHistory,
                  children: [
                    {
                      path: 'det',
                      component: MyCommissionAskMoneyHistoryDet
                    }
                  ]
                }, {
                  path: 'flow',
                  component: MyCommissionAskMoneyFlow
                }
              ]
            }, {
              path: 'ask_money_tied_card', // 未绑卡成功的
              component: MyCommissionAskMoneyTiedCard,
              children: [
                {
                  path: 'tied_result',
                  component: MyCommissionAskMoneyTiedCardResult
                }
              ]
            }, {
              path: 'rule',
              component: MyCommissionRule
            }, {
              path: 'more',
              component: MyCommissionMore,
              children: [
                {
                  path: 'det',
                  component: MyCommissionMoreDet
                }
              ]
            }, {
              path: 'task',
              component: MyCommissionTask,
              children: [
                {
                  path: 'det',
                  component: MyCommissionTaskDet
                }
              ]
            }
          ]
        }, {
          path: 'my_task',
          component: MyTask
        }, {
          path: 'news', // 左上角menu菜单列表
          component: Mews,
          children: [
            {
              path: 'act_det',
              component: MewsDet_Act
            }
          ]
        }, {
          path: 'problem',
          component: Problem,
          children: [
            {
              path: 'pic',
              component: Problem_Pic
            }
          ]
        }, {
          path: 'about',
          component: About
          
        }
      ]
    }
  ]
})
