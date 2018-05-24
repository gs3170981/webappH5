<template>
  <slide-page class="task MY_COMMISSION_TASK" :klass="'MY_COMMISSION_TASK'" :href="top_header.left.href">
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
                <p class="single">
                  <img class="icon" :src="other_icon.order" />
                  <span style="float: left;">限时{{ t.count }}单</span>
                  <img class="icon" :src="other_icon.complete" style="margin-left: .45rem;float: left;" />
                  <span>完成{{ t.now }}单</span>
                </p>
                <p class="timer">
                  <img class="icon" :src="other_icon.clock" style="float: left;" />
                  <span>{{ t.timer }}</span>
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
  //import { Loadmore } from 'mint-ui'
  export default {
    data() {
      return {
        main_option: {
          title: {
            text: '2018.03.17 — 2018.05.17',
            textStyle: {
              color: 'white',
              fontSize: '14',
            },
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} (单)",
          },
          legend: {
            textStyle: {
              color: 'white'
            },
            data: [
              {
                name: '领取',
                icon: 'circle'
              }, {
                name: '成功',
                icon: 'circle'
              }
            ],
            right: '5%',
            top: '10%'
          },
          grid: {
            left: '5%',
            top: '23%',
            right: '5%',
            bottom: '7%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            // TODO 接口接上后，希望将这几个数据变活
            data: ['臻分期', '臻商贷', '臻车贷', '信用卡'],
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
            name: '数量　　　',
            nameTextStyle: {
              color: 'white',
              align: 'left'
            },
            boundaryGap: false,
            minInterval: 50,
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
//        dataZoom: [],
          series: []
        },
        other_icon: {
          clock: require('common/image/history_icon_clock.png'),
          complete: require('common/image/history_icon_complete.png'),
          order: require('common/image/history_icon_order.png')
        },
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
        }, res => { // 可能会存vuex
          //        console.log(r)
          let r = res.arr
          for (let i = 0; i < r.length; i++) {
            r[i].option = this.optionHandle({
              now: r[i].now,
              over: r[i].count - r[i].now
            })
          }
          this.task = r
          for (let i = 0; i < r.length; i++) {
            setTimeout(() => {
              //            console.log(r[i].option)
              let myChart = this.echarts.init($('chart' + r[i].id))
              myChart.setOption(r[i].option)
            }, 20)
          }
          // 主chart渲染
          setTimeout(() => {
            this.main_option.series = [{
              name: '领取',
              type: 'bar',
              barWidth: '30%',
              data: [120, 90, 140, 95],
//            stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color: '#d7faff'
                }
              },
              color: '#2a81f4'
            }, {
              name: '成功',
              type: 'bar',
              barGap: '-100%',
              barWidth: '30%',
              data: [70, 50, 90, 65],
//            stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color: '#9df2ff'
                }
              },
              color: '#69ebff',
            }]
            let mainChart = this.echarts.init($('moreChart'))
            mainChart.setOption(this.main_option)
          }, 20)
        })
      },
      optionHandle(obj) { // echarts option 处理
        return {
          title: {
            text: obj.now,
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
                color: (obj) => {
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
              value: obj.now,
              name: 'now'
            }, {
              value: obj.over,
              name: 'over'
            }]
          }]
        }
      },
      scrollTouchend() {
        // 加载更多数据
        this.allLoaded = false // 取消刷新
        // 模拟数据
        setTimeout(r => {
          let arr = []
          for (let i = 0; i < 4; i++) {
            let obj = {
              id: new Date().getTime() + i,
              timer: '2018.03.17 — 2018.05.17',
              count: 30,
              now: 6,
              option: this.optionHandle({
                now: 6,
                over: 30 - 6
              }),
              type: 'false',
              img: require('common/image/home_icon_loan.png'),
              title: '臻商贷限时推广',
            }
            arr.push(obj)
            this.task.push(obj)
          }
          for (let i = 0; i < arr.length; i++) {
            setTimeout(() => {

              if (!$('chart' + arr[i].id)) {
                return
              }
              let myChart = this.echarts.init($('chart' + arr[i].id))

              myChart.setOption(arr[i].option)
            }, 300 * (i + 1))
          }
          this.allLoaded = true // 可刷新
        }, 1000)
      }
    }
  }
</script>
<style lang="less" scoped>
  .task {
    background: @background-header;
    .header {
      background: @background-header;
    }
    .row-content {
      margin-top: .9rem;
      #moreChart {
        height: 5.5rem;
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
                height: .4rem;
                width: .4rem;
                float: left;
                margin: .07rem .2rem .05rem 0;
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