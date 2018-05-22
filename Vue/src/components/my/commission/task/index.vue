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
          <router-link tag="li" v-for="t in task" class="item row-border-bottom" :key="t.id" :to="{path: 'task/det', query: {id: t.id}}">
            <div class="title"> <img class="icon" :src="t.img" />
              <h5 class="name" v-text="t.title"></h5> <span v-if="t.type === 'false'" class="type">失败</span> <span v-else-if="t.type === 'loading'" class="type loading">进行中</span> <span v-else class="type succ">成功</span> </div>
            <dl class="det"> <dt class="content">
                <!--<i class="fa fa-calendar-o icon"></i> 限时{{ t.count }} 单
                <i class="fa fa-calendar-check-o icon" style="margin-left: .45rem;"></i> 完成{{ t.count }}单
                <br />
                <i class="fa fa-hourglass-2 icon"></i> {{ t.timer }}-->
                <p class="single">
                  <i class="fa fa-calendar-o icon"></i>
                  <span>限时{{ t.count }}单</span>
                  <i class="fa fa-calendar-check-o icon" style="margin-left: .45rem;"></i>
                  <span>完成{{ t.now }}单</span>
                </p>
                <p class="timer">
                  <i class="fa fa-hourglass-2 icon"></i>
                  {{ t.timer }}
                </p>
              </dt>
              <dd :id="'chart'+t.id" class="chart"></dd>
            </dl>
          </router-link>
          <li class="item item-loading">
            <p class="item-loading-title" :class="{ active: !allLoaded }">上拉加载更多</p> <i class="fa fa-spinner fa-pulse item-loading-icon" :class="{ active: allLoaded }"></i> </li>
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
  import { API_taskRecord } from 'api/config.js'
  import BottomFooter from 'base/bottom-footer/bottom-footer'
  /* TODO 有时间把这个放到Vue原型上*/
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/component/graphic'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'
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
        task: [],
        chart_data: {},
        option: {
          color: ['#3398DB'],
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
      this.nav_click()
    },
    mounted() {
      //    let myChart = echarts.init($('moreChart'))
      //    myChart.setOption(this.option)
    },
    methods: {
      nav_click() { // 业务逻辑，到时候接口调通，也要重写
        API_taskRecord({ // 模拟数据 --- 请求参数
          timerS: '2017-05-02',
          timerE: '2018-04-02',
          limit: 5, // 每页显示的条数
          page: 1 // 这些都是去请求接口的，当前的页数(也就是10~20的数据返回)
        }, r => { // 可能会存vuex
//        console.log(r)
          for (let i = 0; i < r.length; i++) {
            r[i].option = {
              title: {
                text: r[i].now,
                textStyle: {
                  color: '#79dbff',
                  fontSize: '10',
                },
                x: '50%',
                y: 'center'
              },
//            color: ['red', '#e6f4fe'],
              series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['70%', '90%'],
                center: ['65%', 'center'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: function (obj) {
//                    console.log(obj)
                      let colorS = [{
                        offset: 0,
                        color: '#a6f1ff' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#5ec0ff' // 100% 处的颜色
                      }]
                      if (obj.data.name === 'over') {
                        return '#e6f4fe'
                      }
                      return {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: .3,
                        y2: 1,
                        colorStops: colorS,
                        globalCoord: false // 缺省为 false
                      }

                    }
                  }
                },
                data: [{
                  value: r[i].now,
                  name: 'now'
                }, {
                  value: r[i].count - r[i].now,
                  name: 'over'
                }]
              }]
            }
          }
          this.task = r
          
          for (let i = 0; i < r.length; i++) {
            setTimeout(() => {
//            console.log(r[i].option)
              let myChart = echarts.init($('chart' + r[i].id))
              myChart.setOption(r[i].option)
            }, 20)
          }
          
                    
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
              width: 4.6rem;
              padding: .24rem 0 .24rem .8rem;
              .single {
                height: .55rem;
              }
              .icon {
                font-size: .3rem;
                margin-right: .1rem;
              }
            }
            .chart {
              margin-top: .24rem;
              float: right;
              height: 1.08rem;
              width: 1.6rem;
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