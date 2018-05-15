<template>
  <slide-page>
    <!--头部-->
    <top-header :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div>
        <!--头部背景-->
        <img class="header" :src="header_img" />
        <!--悬浮的模块-->
        <section class="content-float row-padding">
          <h1 class="title">佣金概览<router-link tag="span" class="more" to="/my_commission/more">查看更多　<i class="fa fa-angle-right"></i></router-link></h1>
          <div id="chart"></div>
        </section>
      </div>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Scroll from 'base/scroll/scroll'
//import echarts from 'echarts'
//import echarts from 'echarts/lib/echarts'
//import 'echarts/lib/pie'
//import 'echarts/lib/tooltip'
//import 'echarts/lib/title'
  
  import { $ } from 'common/js/methods.js'
  export default {
    data () {
      return {
        header_img: require('common/image/commission-header.png'),
        top_header: {
          left: {
            icon: 'fa-angle-left',
            href: '/'
          },
          title: '我的佣金',
          right: {
            icon: 'fa-question-circle-o',
            href: '/my_commission/rule',
          }
        },
        option: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
        }
      }
    },
    components: {
      TopHeader,
      Scroll,
      SlidePage
    },
    created () {
      
    },
    mounted () {
      var echarts = require('echarts/lib/echarts')
      // 引入柱状图
      require('echarts/lib/chart/pie')
      // 引入提示框和标题组件
      require('echarts/lib/component/tooltip')
      require('echarts/lib/component/title')
//    console.log($('chart'))
//    debugger
      let myChart = echarts.init($('chart'))
      myChart.setOption(this.option)
    }
  }
</script>

<style scoped lang="less">
  .row-content {
    
    .header {
      height: 3.3rem;
      width: 100%;
    }
    .content-float {
      position: absolute;
      height: 5rem;
      width: 6.9rem;
      box-sizing: border-box;
      border-radius: .15rem;
      box-shadow: 0 .2rem .45rem 0 #e9eff7;
      left: .3rem;
      top: 2.4rem;
      background: white;
      .title {
        font-size: @font-size-item_title;
        height: .4rem;
        font-weight: bold;
        line-height: .4rem;
        .more {
          color: @color-hui;
          float: right;
        }
      }
      #chart {
        height: 2.9rem;
        line-height: 2.9rem;
      }
    }
  }
</style>