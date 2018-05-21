<template>
  <slide-page class="more">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll" :pullup='allLoaded' :data="task" @scrollToEnd="scrollTouchend">
      <!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <!--TODO 有bug，高度计算有误，暂时先这样使用-->
      <div style="padding-bottom: .9rem;">
        <section id="moreChart"></section>
        <p class="task-title row-padding">任务记录</p>
        <ul class="task-det">
          
          <router-link tag="li" 
            v-for="t in task" 
            class="item row-border-bottom" 
            :key="t.id" 
            :to="{path: 'task/det', query: {id: t.id}}">
            <div class="title">
              <img class="icon" :src="t.img" />
              <h5 class="name" v-text="t.title"></h5>
              <span v-if="t.type === 'false'" class="type">失败</span>
              <span v-else-if="t.type === 'loading'" class="type loading">进行中</span>
              <span v-else class="type succ">成功</span>
            </div>
            <dl class="det">
              <dt class="content">
                <p class="single">
                  <i class="fa fa-calendar-o icon"></i>
                  <span>限时{{ t.count }}单</span>
                  <i class="fa fa-calendar-check-o icon" style="margin-left: .45rem;"></i>
                  <span>完成{{ t.count }}单</span>
                </p>
                <p class="timer">
                  <i class="fa fa-hourglass-2 icon"></i>
                  {{ t.timer }}
                </p>
              </dt>
              <dd class="chart"></dd>
            </dl>
              
          </router-link>
          <li class="item item-loading">
            <p class="item-loading-title" :class="{ active: !allLoaded }">上拉加载更多</p>
            <i class="fa fa-spinner fa-pulse item-loading-icon" :class="{ active: allLoaded }"></i>
          </li>
        </ul>
      </div>
    </scroll>
    <!--底部-->
    <bottom-footer class="footer"></bottom-footer>
    <!--子滑动页面-->
    <router-view></router-view>
  </slide-page>
</template>
<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Scroll from 'base/scroll/scroll'
  import { $ } from 'common/js/methods.js'
  import { API_commission } from 'api/config.js'
  import BottomFooter from 'base/bottom-footer/bottom-footer'
  
  /* TODO 有时间把这个放到Vue原型上*/
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/component/graphic'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/dataZoom'
  
//import { Loadmore } from 'mint-ui'

  export default {
    data() {
      return {
        allLoaded: true, // 可下拉
        top_header: {
          left: {
            icon: 'fa-angle-left',
            href: '/my_commission'
          },
          title: '历史任务',
          right: {
            icon: 'fa-calendar',
            href: ''
          }
        },
        task: [
          {
            id: 'a',
            timer: '2018.03.17 — 2018.05.17',
            count: 30,
            now: 24,
            type: 'false',
            img: require('common/image/home_icon_loan.png'),
            title: '臻商贷限时推广',
          }, {
            id: 'b',
            timer: '2018.03.17 — 2018.05.17',
            count: 30,
            now: 30,
            type: 'true',
            img: require('common/image/home_icon_car.png'),
            title: '臻车贷限时推广'
          }, {
            id: 'c',
            timer: '2018.03.17 — 2018.05.17',
            count: 30,
            now: 24,
            type: 'loading',
            img: require('common/image/home_icon_card.png'),
            title: '信用卡限时推广'
          }
        ],
        chart_data: {},
        option: {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} (元)",
          },
          grid: {
            left: '5%',
            top: '5%',
            right: '5%',
            bottom: '0',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: [],
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#6db6f8'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              lineStyle: {
                color: 'rgba(109, 182, 248, 0.5)'
              }
            },
            boundaryGap: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          }],
          dataZoom: [],
          series: []
        }
      }
    },
    components: {
      TopHeader,
      Scroll,
      SlidePage,
      BottomFooter
//    'mt-loadmore': Loadmore
    },
    created() {
//    this.nav_click(this.nav[0])
    },
    mounted() {
      
      
//    let myChart = echarts.init($('moreChart'))
//    myChart.setOption(this.option)
    },
    methods: {
      nav_click (t) { // 业务逻辑，到时候接口调通，也要重写
        let data = this.nav
        if (t.is) {
          return
        }
        for (let i = 0; i < data.length; i++) {
          data[i].is = false
          data[i].is2 = false
        }
        t.is = true
        if (t.id === 'a') {
          for (let i = 0; i < data.length; i++) {
            data[i].is2 = true
          }
        } else {
          t.is2 = true
        }


        API_commission({ // 模拟数据 --- 请求参数
          timer: 2018, // 截止当前时间
          limit: 5, // 每页显示的条数
          title: t.title,
          page: 1 // 这些都是去请求接口的，当前的页数(也就是10~20的数据返回)
        }, r => { // 可能会存vuex
          console.log(r)
          r.is = true
          this.chart_data = r
          
          this.option.xAxis[0].data = r[0]
          this.option.dataZoom = [{
            type: 'inside',
            show: true,
            startValue: r[1].length - 6,
            endValue: r[1].length - 1
          }]
          this.option.series = [{
            name: t.title,
            type: 'bar',
            barWidth: '30%',
            data: r[1],
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: "￥{c} ",
                color: '#71dffe'
              }
            },
            itemStyle: {
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#b4f9ff'
                }, {
                  offset: 1,
                  color: '#6fc4ff'
                }])
              }
            },
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#60c8fd'
            }, {
              offset: 1,
              color: '#4093f8'
            }]),
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              }
            }
          }]
          console.log(this.option)
          setTimeout(r => {
            let myChart = echarts.init($('moreChart'))
            myChart.setOption(this.option)
          }, 20)
          
        })
      },
      scrollTouchend() {
        // 加载更多数据
        this.allLoaded = false // 取消刷新
        // 模拟数据
        setTimeout(r => {
          for (let i = 0; i < 4; i++) {
            this.task.push({
              id: new Date().getTime() + i,
              timer: '2018-03-17 16:40',
              img: require('common/image/overview_icon_gift.png'),
              title: '任务奖励-臻分期',
              money: 500
            })
          }
          this.allLoaded = true // 可刷新
        }, 1000)
      }
    }
  }
</script>
<style lang="less" scoped>
  .more {
    background: @background-header;
    .header {
      background: @background-header;
    }
    .row-content {
      margin-top: .9rem;
      #moreChart {
        height: 3.86rem;
      }
      .task-title {
        height: .36rem;
        font-weight: bold;
        line-height: .36rem;
        font-size: @font-size-item_title;
        background: @color-hui1;
      }
      .task-det {

        background: white;
        .item {
          padding: 0 .24rem;
          .title {
            height: .8rem;
            line-height: .8rem;
            display: flex;
            align-items: center;
            border-bottom: .01rem solid @color-hui1;
            .icon {
              height: .54rem;
              width: .58rem;
              margin-right: .2rem;
            }
            .name {
              font-size: @font-size-item_title;
            }
            .type {
              font-size: .32rem;
              color: @color-org;
              font-weight: bold;
              margin-left: auto;
            }
            .loading {
              color: @color-yellow;
            }
            .succ {
              color: @color-green;
            }
          }
          .det {
            overflow: hidden;
            .content {
              float: left;
              color: @color-hui;
              line-height: .55rem;
              padding: .24rem 0 .24rem .69rem;
              .single {
                height: .55rem;
              }
              .icon {
                font-size: .3rem;
                margin-right: .1rem;
              }
            }
            
            .chart {
              float: right;
            }
          }
          

        }
        .item-loading {
          height: .8rem;
          position: relative;
          .item-loading-title {
            text-align: center;
            position: absolute;
            line-height: .8rem;
            width: 95%;
            color: @color-hui;
          }
          .item-loading-icon {
            position: absolute;
            left: 3.5rem;
            color: @color-hui;
            font-size: @font-size-big;
            line-height: .8rem;
            text-align: center;
            position: absolute;
          }
          .active {
            visibility: hidden;
          }
        }
        
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: white;
      z-index: -1;
      padding-top: 2.5rem;
    }
  }
</style>