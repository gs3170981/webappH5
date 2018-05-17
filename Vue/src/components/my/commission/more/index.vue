<template>
  <slide-page class="more">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll">
      <!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div>
        <ul class="nav">
          <li class="item" 
            :class="{ active: t.is }" 
            v-for="t in nav" 
            @click="nav_click(t)" 
            v-text="t.title">
          </li>
        </ul>
        <section id="moreChart"></section>
        <ul class="money">
          <li class="item" v-for="(t, i) in nav" v-if="i > 0">
            <h6 class="title" v-text="t.title"></h6>
            <p class="det">+{{t.money}}</p>
          </li>
        </ul>
        <p></p>
        <ul></ul>
      </div>
    </scroll>
  </slide-page>
</template>
<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Scroll from 'base/scroll/scroll'
  import { $ } from 'common/js/methods.js'
  import { API_commission } from 'api/config.js'
  
  /* TODO 有时间把这个放到Vue原型上*/
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/component/graphic'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/dataZoom'
  
  
  
  export default {
    data() {
      return {
        top_header: {
          left: {
            icon: 'fa-angle-left',
            href: '/my_commission'
          },
          title: '佣金概况',
          right: {
            icon: '',
            href: ''
          }
        },
        nav: [
          {
            id: 'a',
            title: '全部',
            is: false
          }, {
            id: 'b',
            is: false,
            title: '活动奖励',
            money: 400
          }, {
            id: 'c',
            is: false,
            money: 700,
            title: '臻商贷'
          }, {
            id: 'd',
            is: false,
            money: 300,
            title: '臻车贷'
          }, {
            id: 'e',
            is: false,
            money: 100,
            title: '信用卡'
          }
        ],
        record: [
          {
            timer: '2018-05-19 16:40',
            money: 500,
            img: require('common/image/home_icon_loan.png'),
            title: '臻商贷-来自张三丰'
          }, {
            timer: '2018-05-17 16:40',
            title: '臻车贷-来自胡适',
            img: require('common/image/home_icon_car.png'),
            money: 500
          }, {
            timer: '2018-04-17 16:40',
            img: require('common/image/home_icon_card.png'),
            title: '信用卡-来自萧红',
            money: 500
          }, {
            timer: '2018-03-17 16:40',
            img: require('common/image/overview_icon_cash.png'),
            title: '提现-到南京银行(1903)',
            money: -500
          }, {
            timer: '2018-03-17 16:40',
            img: require('common/image/overview_icon_gift.png'),
            title: '任务奖励-臻分期',
            money: 500
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
      SlidePage
    },
    created() {
      this.nav_click(this.nav[0])
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
        }
        t.is = true
        
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
      .nav {
        height: .83rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        .item {
          height: .5rem;
          line-height: .5rem;
          color: rgba(255, 255, 255, 0.5);
          padding: 0 .17rem;
          transition: all .2s ease;
          margin: 0 .075rem;
        }
        .active {
          background: #1689fe;
          color: white;
          border-radius: .5rem;
        }
      }
      #moreChart {
        padding-bottom: .8rem;
        height: 3.86rem;
      }
      .money {
        height: 1.1rem;
        text-align: center;
        margin: 0 .3rem;
        display: flex;
        background: white;
        justify-content: center;
        align-items: center;
        line-height: .35rem;
        color: @color-hui;
        padding: 0 .45rem;
        .item {
          margin-right: .6rem;
          &:last-child {
            margin-right: 0;
          }
          .title {
            font-size: @font-size-smail;
            margin-bottom: .02rem;
          }
        }
      }
    }
  }
</style>