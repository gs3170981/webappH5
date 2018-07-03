<template>
  <slide-page class="MENU_ITEM_STAGES" :klass="'MENU_ITEM_STAGES'" :href="top_header.left.href">
    <!--头部-->
    <top-header :opt="top_header"></top-header>
    
    <!--首页内容核心-->
    <scroll class="row-content" ref="scroll" :end="true" @scrollToEnd="scrollEnd" :start="true" @scrollToStart="scrollStart"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
    <!--竖向可拖动，优化性能，取消自带的滚动条-->
      <div><!--必须加-->
        
        
        
        <header class="header row-padding" :style="{ background: header.img }">
          <img class="icon" :src="header.icon" />
          <span class="title">臻分期</span>
          <div class="btn">
            <span style="font-size: .45rem;">＋</span>
            <span style="float: right;">关注</span>
          </div>
        </header>
        
        <!--item内容(头部导航栏)-->
        <!--<section class="row-padding menu row-border-bottom">
          <h1 class="title">我的订单</h1>
          <ul class="det">
            
            <router-link v-for="t in my_item" :key="t.id" tag="li" class="item row-item" :to="t.href">
              <img class="icon" :src="t.path" />
              <p class="name" v-text="t.title"></p>
            </router-link>
          </ul>
        </section>-->

        <!--item中部内容(分期助手)-->
        <ul class="menu">
          <router-link v-for="(t, i) in money_item" :key="i" tag="li" class="item row-item" :to="t.href">
            <img class="icon" :src="t.path" />
            <p class="name" v-text="t.title"></p>
          </router-link>
        </ul>
        
        <!--TODO 在子页面时，banner的定时器未清空,仍在执行,有时间改改-->
        <banner v-if="banner.length" class="row-slider-wrapper" :dotsIndex="bannerIndexStyle">
          <div class="banner" v-for="t in banner">
            <a :href="t.url">
              <img class="needsclick" @load="loadImage" :src="t.href">
            </a>
          </div>
        </banner>
        
        <!--list-->
        <section class="rank row-border-bottom">
          <h1 class="title">业绩排名<router-link tag="span" class="more" to="/chartAnalysisMore">查看更多<img class="row-icon-right" :src="icon.right" /></router-link></h1>
          <ul class="det">
            <li class="item" v-for="t in rank">
              <img class="icon" :src="icon[t.type]"/>
              <h3 class="name" v-text="t.title"></h3>
              <div class="number"><span>{{ t.val }}</span> <span>单</span></div>
            </li>
          </ul>
        </section>
        
        <!--底部-->
        <bottom-footer></bottom-footer>
      </div>
    </scroll>

    <img class="plus_btn row-item" :src="plus_btn" />
    
    <!--子滑动页面-->
    <router-view></router-view>
  </slide-page>
</template>

<script type="text/ecmascript-6">
//import { API_banner } from 'api/config.js'
//import { M_NumberPlusReduce } from 'common/js/methods.js'
  import Banner from 'base/banner/banner'
  import SlidePage from 'base/slide-page/slide-page'
  import Scroll from 'base/scroll/scroll'
  import TopHeader from 'base/top-header/top-header'
  import BottomFooter from 'base/bottom-footer/bottom-footer'
  import { scroll_header } from 'common/js/mixins.js'
  export default {
    mixins: [scroll_header],
    data () {
      return {
        bannerIndexStyle: {
          background: '#4091f7'
        },
        icon: {
          right: require('common/image/det_btn_more.png'),
          '0': require('common/image/home_icon_first.png'),
          '1': require('common/image/home_icon_third.png'),
          '2': require('common/image/home_icon_second.png')
        },
        header: {
          img: 'url(' + require('common/image/stages_top_banner.png') + ')no-repeat top center',
          icon: require('common/image/home_icon_stages.png')
        },
        money_item: [
          {
            id: 'a',
            path: require('common/image/home_icon_order.png'),
            href: '/moneyItem_info',
            title: '订单列表'
          }, {
            id: 'b',
            path: require('common/image/home_icon_overview.png'),
            href: '/order_over',
            title: '业绩概览'
          }, {
            id: 'c',
            path: require('common/image/home_icon_loan.png'),
            href: '/order_over',
            title: '贷后管理'
          }, {
            id: 'd',
            path: require('common/image/home_icon_drafts.png'),
            href: '/order_over',
            title: '云草稿箱'
          }, {
            id: 'd',
            path: require('common/image/home_icon_notice.png'),
            href: '/order_over',
            title: '分期须知'
          }, {
            id: 'd',
            path: require('common/image/home_icon_msg.png'),
            href: '/order_over',
            title: '消息中心'
          }
        ],
        banner: [
          {
            url: '/',
            href: require('common/image/stages_banner.png'),
            id: 'a'
          }, {
            url: '/',
            href: require('common/image/pay_banner.png'),
            id: 'a'
          }
        ],
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/'
          },
          title: '',
          right: {
            icon: require('common/image/nav_btn_user.png'),
            href: '',
          }
        },
        rank: [
          {
            type: 0,
            title: '四川好管家-杨洋',
            val: 102
          }, {
            type: 1,
            title: '石家庄天网-孙怡',
            val: 101
          }, {
            type: 2,
            title: '四川好管家-杨洋',
            val: 100
          }
        ],
        plus_btn: require('common/image/suspend_btn.png')
      }
    },
    components: {
      Banner,
      Scroll,
      TopHeader,
      SlidePage,
      BottomFooter
    },
    created () {
      // 获取手机号存VUEX
//    this.$store.commit('save', '17764587901')
      
      // 模拟数据
//    API_banner({ 
//      val: 123
//    }, r => {
//      this.banner = r.data.slider
//    })

      // 模拟数据
//    setTimeout(r => {
//      let chart = [{id:'a',title:'臻分期',val:80},{id:'b',title:'臻商贷',val:50},{id:'c',title:'臻车贷',val:40},{id:'d',title:'信用卡',val:60}]
//      for (let i = 0; i < chart.length; i++) {
//        for (let j = 0; j < this.chart.length; j++) {
//          if (this.chart[j].id === chart[i].id) {
//            M_NumberPlusReduce({
//              e: this.chart[j],
//              val: 'val'
//            }, chart[i].val)
//            break
//          }
//        }
//      }
//    }, 200)

      
    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      }
    }
  }
</script>

<style scoped lang='less'>
  .MENU_ITEM_STAGES {
    position: fixed;
    background: @color-hui1;
    width: 100%;
    top: 0; /*什么破设定，没就错*/
    bottom: 0; /*什么破设定，没就错*/

    .row-content {
      .header {
        padding-top: 2.4rem;
        box-sizing: border-box;
        height: 3.4rem;
        width: 100%;
        color: white;
        line-height: .54rem;
        overflow: hidden;
        background-size: 100% 100%!important;
        .icon {
          float: left;
          height: .54rem;
          width: .58rem;
        }
        .title {
          margin: 0 .3rem 0 .2rem;
          float: left;
          font-size: .34rem;
        }
        .btn {
          float: left;
          border-radius: .3rem;
          height: .55rem;
          padding: 0 .2rem 0 .1rem;
          background: #febe5b;
          font-size: @font-size-item_det1;
          
        }
      }
      .menu {
        margin-bottom: .2rem;
        overflow: hidden;
        background: white;
        padding: .3rem 0;
        .item {
          float: left;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 1.45rem;
          flex-direction: column;
          width: 33.33333%;
          .icon {
            width: .64rem;
            height: .64rem;
            margin-bottom: .15rem;
          }
          .name {
            font-size: .26rem;
          }
        }
        
      }
      .banner {
        .needsclick {
          height: 2rem;
        }
      }
      .rank {
        margin-top: .2rem;
        padding: .1rem .3rem;
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
            height: .9rem;
            display: flex;
            align-items: center;
            overflow: hidden;
            line-height: .75rem;
            .icon {
              height: .5rem;
              width: .4rem;
            }
            .name {
              margin-left: .2rem;
            }
            .number {
              width: 1.46rem;
              margin-left: auto;
              text-align: right;
              color: @color-org;
              font-size: @font-size-big;
            }
          }
        }
      }
    }
    .plus_btn {
      position: fixed;
      bottom: .5rem;
      width: .85rem;
      height: .85rem;
      right: .5rem;
      box-shadow: .05rem .05rem .2rem rgba(252, 185, 82, .5);
      border-radius: 50%;
    }
  }
</style>
