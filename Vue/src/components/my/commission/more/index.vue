<template>
  <slide-page class="more">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll" :pullup='allLoaded' :data="record" @scrollToEnd="scrollTouchend">
      <!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <!--TODO 有bug，高度计算有误，暂时先这样使用-->
      <div style="padding-bottom: .9rem;">
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
          <li class="item" v-for="(t, i) in nav" :class="{ active: t.is2 }" v-if="i > 0">
            <h6 class="title" v-text="t.title"></h6>
            <p class="det">{{t.money}}.00</p>
          </li>
        </ul>
        <p class="record-title row-padding">佣金记录</p>
        <ul class="record-det">
          
          <router-link tag="li" 
            v-for="t in record" 
            class="item" 
            :key="t.id" 
            :to="{path: 'more/det', query: {id: t.id}}">
            <img class="icon" :src="t.img" />
            <dl>
              <dt class="record-det-title" v-text="t.title"></dt>
              <dd class="record-det-timer" v-text="t.timer"></dd>
            </dl>
            <div v-if="t.money >= 0" class="record-det-money">+{{ t.money }}.00</div>
            <div v-else class="record-det-money" style="color: black;">{{ t.money }}.00</div>
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
            is: false,
            is2: false
          }, {
            id: 'b',
            is: false,
            title: '活动奖励',
            is2: false,
            money: '+400'
          }, {
            id: 'c',
            is: false,
            money: '+700',
            is2: false,
            title: '臻商贷'
          }, {
            id: 'd',
            is: false,
            money: 300,
            is2: false,
            title: '臻车贷'
          }, {
            id: 'e',
            is: false,
            is2: false,
            money: 100,
            title: '信用卡'
          }
        ],
        record: [
          {
            id: 'a',
            timer: '2018-05-19 16:40',
            money: 500,
            img: require('common/image/home_icon_loan.png'),
            title: '臻商贷-来自张三丰'
          }, {
            id: 'b',
            timer: '2018-05-17 16:40',
            title: '臻车贷-来自胡适',
            img: require('common/image/home_icon_car.png'),
            money: 500
          }, {
            id: 'c',
            timer: '2018-04-17 16:40',
            img: require('common/image/home_icon_card.png'),
            title: '信用卡-来自萧红',
            money: 500
          }, {
            id: 'd',
            timer: '2018-03-17 16:40',
            img: require('common/image/overview_icon_cash.png'),
            title: '提现-到南京银行(1903)',
            money: -500
          }, {
            id: 'e',
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

        // TODO 当月时间不加年限的前缀，之后都加17年，16年
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
                color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#b4f9ff'
                }, {
                  offset: 1,
                  color: '#6fc4ff'
                }])
              }
            },
            color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
            let myChart = this.echarts.init($('moreChart'))
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
            this.record.push({
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
        position: relative;
        z-index: 1;
        box-shadow: 0 .16rem .29rem 0 rgba(145, 175, 212, 0.1);
        color: @color-hu3;
        margin-top: -.6rem;
        border-radius: .1rem;
        padding: 0 .45rem;
        .item {
          margin-right: .6rem;
          &:last-child {
            margin-right: 0;
          }
          .title {
            font-size: @font-size-smail;
            margin-bottom: .02rem;
            font-weight: bold;
          }
          .det {
            font-weight: bold;
          }
        }
        .active {
          color: black;
        }
      }
      .record-title {
        height: .36rem;
        font-weight: bold;
        line-height: .36rem;
        padding-top: .77rem;
        font-size: @font-size-item_title;
        margin-top: -.53rem;
        background: @color-hui1;
      }
      .record-det {
        padding: 0 .24rem;
        background: white;
        .item {
          height: 1.2rem;
          overflow: hidden;
          display: flex;
          border-bottom: .01rem solid @color-hui1;
          align-items: center;
          .icon {
            height: .54rem;
            width: .58rem;
            margin-right: .2rem;
          }
          .record-det-title {
            font-size: @font-size-item_title;
            margin-bottom: .15rem;
          }
          .record-det-timer {
            font-size: @font-size-smail;
            color: @color-hui;
          }
          .record-det-money {
            margin-left: auto;
            font-weight: bold;
            color: @color-org;
          }
        }
        .item-loading {
          height: .8rem;
          line-height: .8rem;
          position: relative;
          .item-loading-title {
            text-align: center;
            position: absolute;
            width: 100%;
            color: @color-hui;
          }
          .item-loading-icon {
            position: absolute;
            left: 3.35rem;
            font-size: .4rem;
            color: @color-hui;
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