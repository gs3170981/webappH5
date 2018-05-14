<template>
  <div class="main">
    <!--头部-->
    <top-header class="header"
      :opt="top_header"
      @left="topHeader_close"
      @right="topHeader_menu">
    </top-header>
    <!--首页内容核心-->
    <scroll class="content" ref="scroll" :data="items"><!--:data=xxx监听会变动的数据所导致的高度变更，节点自动计算然后可上下滚动-->
    <!--竖向可拖动，优化性能，取消自带的滚动条-->
      <div><!--必须加-->
        <banner v-if="banner.length" class="slider-wrapper">
          <div v-for="item in banner">
            <a :href="item.linkUrl">
              <!--如果fastclick延迟点击与自身click冲突，则加needsclick样式，进行冒泡-->
              <img class="needsclick" @load="loadImage" :src="item.picUrl">
            </a>
          </div>
        </banner>
        <!--item内容-->
        <ul class="row-padding menu row-border-bottom">
          <li class="item row-item" v-for="t in items">
            <img class="icon" :src="t.path" />
            <p class="title" v-text="t.title"></p>
          </li>
        </ul>
        <!--<ul>
          <li style="background: black;color: white;line-height: 1.5rem;" v-for="item in items" v-text="item" @click="test()"></li>
        </ul>-->
        <!--图表的内容-->
        <section class="row-padding chart row-border-bottom">
          <h1 class="title">推广业绩<span class="more">查看更多　<i class="fa fa-angle-right"></i></span></h1>
          <ul class="det">
            <li class="item" v-for="t in chart">
              <h3 class="name" v-text="t.title"></h3>
              <div class="rate">
                <p class="bg"></p>
                <p class="now" :style="{ width: t.val + '%' }"></p>
              </div>
              <div class="number">{{ t.val }} <span>单</span></div>
            </li>
          </ul>
        </section>
        <!--任务-->
        <section class="row-padding task">
          <h1 class="title">权益任务</h1>

        </section>
        <!--底部-->
        <bottom-footer></bottom-footer>
      </div>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { api_banner } from 'api/config.js'
  import Banner from 'base/banner/banner'
  import Scroll from 'base/scroll/scroll'
  import TopHeader from 'base/top-header/top-header'
  import BottomFooter from 'base/bottom-footer/bottom-footer'
  export default {
    data () {
      return {
        items: [
          {
            path: require('common/image/home_icon_stages.png'),
            title: '臻分期'
          }, {
            path: require('common/image/home_icon_loan.png'),
            title: '臻商贷'
          }, {
            path: require('common/image/home_icon_car.png'),
            title: '臻车贷'
          }, {
            path: require('common/image/home_icon_card.png'),
            title: '信用卡'
          }
        ],
        chart: [
          {
            id: 'a',
            title: '臻分期',
            val: 0
          }, {
            id: 'b',
            title: '臻商贷',
            val: 0
          }, {
            id: 'c',
            title: '臻车贷',
            val: 0
          }, {
            id: 'd',
            title: '信用卡',
            val: 0
          }
        ],
        banner: [],
        top_header: {
          left_icon: 'fa-angle-left',
          right_icon: 'fa-reorder'
        }
      }
    },
    components: {
      Banner,
      Scroll,
      TopHeader,
      BottomFooter
    },
    created () {
      // 模拟数据
      api_banner({
        val: 123
      }, r => {
        this.banner = r.data.slider
      })

      // 模拟数据
      setTimeout(r => {
        let chart = [{id:'a',title:'臻分期',val:80},{id:'b',title:'臻商贷',val:50},{id:'c',title:'臻车贷',val:40},{id:'d',title:'信用卡',val:60}]
        this.chart = chart
      }, 200)
//    this.items = [1,2,3,4,5,6,7,8,9,10,11,12,13]

    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      test () {
        this.$router.push({
          path: '/chartAnalysis'
        })
      },
      topHeader_close () {
        console.log('close')
      },
      topHeader_menu () {
        console.log('menu')
      }
    }
  }
</script>

<style scoped lang='less'>
  .main {
    position: fixed;
    background: @color-hui1;
    width: 100%;
    top: 0; /*什么破设定，没就错*/
    bottom: 0; /*什么破设定，没就错*/

    .content {
      height: 100%;
      overflow: hidden;

      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .menu {
        background: white;
        display: flex;
        justify-content: center;
        .item {
          width: 1.45rem;
          margin-right: .4rem;
          text-align: center;
          &:last-child {
            margin-right: 0;
          }

          .icon {
            height: .54rem;
            width: .58rem;
            margin-bottom: .2rem;
          }
          .title {
            font-size: @font-size-item_det1;
          }
        }
      }
      .chart {
        background: white;
        .title {
          font-size: @font-size-item_title;
          height: .6rem;
          font-weight: bold;
          line-height: .6rem;
          .more {
            color: @color-hui;
            float: right;
          }
        }
        .det {
          padding: .2rem .05rem 0;
          .item {
            height: .75rem;
            overflow: hidden;
            line-height: .75rem;
            .name {
              float: left;
              width: 1.53rem;
            }
            .rate {
              float: left;
              width: 3.75rem;
              height: .15rem;
              top: .3rem;
              position: relative;
              .bg {
                background: #e0ecf3;
                border-radius: .2rem;
                height: 100%;
                width: 100%;
              }
              .now {
                background: @background-blue-back;
                border-radius: .2rem;
                height: .15rem;
                top: 0;
                position: absolute;
                width: 0;
                transition: width .2s ease;
              }
            }
            .number {
              width: 1.46rem;
              float: right;
              text-align: right;
              color: @color-org;
              font-size: @font-size-big;
            }
          }
        }
      }
      .task {
        background: white;
        .title {
          font-size: @font-size-item_title;
          height: .6rem;
          font-weight: bold;
          line-height: .6rem;
        }
        .det {
          padding: .2rem 0 .43rem;
          .img {

          }
        }
      }
    }
  }
</style>
