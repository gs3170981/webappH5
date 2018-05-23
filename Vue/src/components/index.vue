<template>
  <div class="main">
    <!--头部-->
    <top-header 
      :opt="top_header" 
      @left="topHeader_close" 
      @right="topHeader_menu">
    </top-header>
    
    <!--首页内容核心-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
    <!--竖向可拖动，优化性能，取消自带的滚动条-->
      <div><!--必须加-->
        
        <!--TODO 在子页面时，banner的定时器未清空,仍在执行,有时间改改-->
        <banner v-if="banner.length" class="row-slider-wrapper">
          <div v-for="t in banner">
            <a :href="t.linkUrl">
              <!--如果fastclick延迟点击与自身click冲突，则加needsclick样式，进行冒泡-->
              <img class="needsclick" @load="loadImage" :src="t.picUrl">
            </a><!--loadImage有啥用回家再看-->
          </div>
        </banner>
        
        <!--item内容(头部导航栏)-->
        <ul class="row-padding menu row-border-bottom">
          <router-link v-for="t in items" :key="t.id" tag="li" class="item row-item" :to="t.href">
            <img class="icon" :src="t.path" />
            <p class="title" v-text="t.title"></p>
          </router-link>
        </ul>
        
        <!--图表的内容-->
        <section class="row-padding chart row-border-bottom">
          <h1 class="title">推广业绩<router-link tag="span" class="more" to="/chartAnalysisMore">查看更多　<i class="fa fa-angle-right"></i></router-link></h1>
          <ul class="det">
            <li class="item" v-for="t in chart">
              <h3 class="name" v-text="t.title"></h3>
              <div class="rate">
                <p class="bg"></p>
                <!--TODO 这边width性能有问题，有时间改成scale3d-->
                <p class="now" :style="{ width: t.val + '%' }"></p>
              </div>
              <div class="number">{{ t.val }} <span>单</span></div>
            </li>
          </ul>
        </section>
        
        <!--任务(底部导航栏)-->
        <section class="row-padding task">
          <h1 class="title">权益任务</h1>
          <div class="det">
            <router-link v-for="t in footer_nav" :key="t.id" tag="img" class="img row-item" :to="t.href" :src="t.path"></router-link>
          </div>
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
  import { API_banner } from 'api/config.js'
  import { M_NumberPlusReduce } from 'common/js/methods.js'
  import Banner from 'base/banner/banner'
  import Scroll from 'base/scroll/scroll'
  import TopHeader from 'base/top-header/top-header'
  import BottomFooter from 'base/bottom-footer/bottom-footer'
  export default {
    data () {
      return {
        items: [
          {
            id: 'a',
            path: require('common/image/home_icon_stages.png'),
            href: '/menuItem_stages',
            title: '臻分期'
          }, {
            id: 'b',
            path: require('common/image/home_icon_loan.png'),
            href: '/menuItem_shop',
            title: '臻商贷'
          }, {
            id: 'c',
            path: require('common/image/home_icon_car.png'),
            href: '/menuItem_car',
            title: '臻车贷'
          }, {
            id: 'd',
            path: require('common/image/home_icon_card.png'),
            href: '/menuItem_card',
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
          left: {
            icon: 'fa-angle-left',
            href: ''
          },
          title: '',
          right: {
            icon: 'fa-reorder',
            href: '',
            item: [
              {
                id: 'a',
                icon: 'fa-bell-o',
                title: '消息中心',
                href: '/news'
              }, {
                id: 'b',
                icon: 'fa-commenting-o',
                title: '问题建议',
                href: '/problem'
              }, {
                id: 'c',
                icon: 'fa-address-card-o',
                title: '关于我们',
                href: '/about'
              }
            ]
          }
        },
        footer_nav: [
          {
            id: 'a',
            path: require('common/image/home_img_comm.png'),
            href: '/my_commission'
          }, {
            id: 'b',
            path: require('common/image/home_img_task.png'),
            href: '/my_task'
          }
        ]
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
      API_banner({ 
        val: 123
      }, r => {
        this.banner = r.data.slider
      })

      // 模拟数据
      setTimeout(r => {
        let chart = [{id:'a',title:'臻分期',val:80},{id:'b',title:'臻商贷',val:50},{id:'c',title:'臻车贷',val:40},{id:'d',title:'信用卡',val:60}]
        for (let i = 0; i < chart.length; i++) {
          for (let j = 0; j < this.chart.length; j++) {
            if (this.chart[j].id === chart[i].id) {
              M_NumberPlusReduce({
                e: this.chart[j],
                val: 'val'
              }, chart[i].val)
              break
            }
          }
        }
      }, 200)

      
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

    .row-content {
      
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
                background: #edf4f8;
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
                transition: all .2s ease;
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
          padding: .2rem .05rem .43rem;
          overflow: hidden;
          .img {
            float: left;
            height: 1.3rem;
            width: 3.22rem;
            border-radius: .02rem;
            margin-right: .36rem;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
