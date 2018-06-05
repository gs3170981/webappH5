<template>
  <div class="main">
    <!--头部-->
    <top-header :opt="top_header" @left="topHeader_close"></top-header>
    
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
        <section class="row-padding menu row-border-bottom">
          <h1 class="title">我的订单</h1>
          <ul class="det">
            
            <router-link v-for="t in my_item" :key="t.id" tag="li" class="item row-item" :to="t.href">
              <img class="icon" :src="t.path" />
              <p class="name" v-text="t.title"></p>
            </router-link>
          </ul>
        </section>

        <!--item中部内容(分期助手)-->
        <section class="row-padding menu row-border-bottom">
          <h1 class="title">分期助手</h1>
          <ul class="det">
            
            <router-link v-for="t in money_item" :key="t.id" tag="li" class="item row-item" :to="t.href">
              <img class="icon" :src="t.path" />
              <p class="name" v-text="t.title"></p>
            </router-link>
          </ul>
        </section>
        
        <!--TODO 在子页面时，banner的定时器未清空,仍在执行,有时间改改-->
        <banner v-if="banner.length" class="row-slider-wrapper" :dotsIndex="bannerIndexStyle">
          <div class="banner" v-for="t in banner">
            <a :href="t.url">
              <img class="needsclick" @load="loadImage" :src="t.href">
            </a>
          </div>
        </banner>
        
        
        <!--底部-->
        <bottom-footer></bottom-footer>
      </div>
    </scroll>

    <img class="plus_btn row-item" :src="plus_btn" />
    
    <!--子滑动页面-->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { API_banner } from 'api/config.js'
//import { M_NumberPlusReduce } from 'common/js/methods.js'
  import Banner from 'base/banner/banner'
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
        header: {
          img: 'url(' + require('common/image/stages_top_banner.png') + ')no-repeat top center',
          icon: require('common/image/home_icon_stages.png')
        },
        my_item: [
          {
            id: 'a',
            path: require('common/image/stages_icon_examine.png'),
            href: '/myOrder_item?type=0',
            title: '审核中'
          }, {
            id: 'b',
            path: require('common/image/stages_icon_write.png'),
            href: '/myOrder_item?type=1',
            title: '待签约'
          }, {
            id: 'c',
            path: require('common/image/stages_icon_money.png'),
            href: '/myOrder_item?type=2',
            title: '待放款'
          }, {
            id: 'd',
            path: require('common/image/stages_icon_payment.png'),
            href: '/myOrder_item?type=3',
            title: '待付款'
          }, {
            id: 'e',
            path: require('common/image/stages_icon_end.png'),
            href: '/myOrder_item?type=4',
            title: '已结束'
          }
        ],
        money_item: [
          {
            id: 'a',
            path: require('common/image/stages_icon_pay.png'),
            href: '/moneyItem_info',
            title: '查账付款'
          }, {
            id: 'b',
            path: require('common/image/stages_icon_progress.png'),
            href: '/order_over',
            title: '分配进度'
          }, {
            id: 'c',
            path: require('common/image/stages_icon_kown.png'),
            href: '/order_over',
            title: '分期须知'
          }, {
            id: 'd',
            path: require('common/image/stages_icon_new.png'),
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
            href: ''
          },
          title: '',
          right: {
            icon: require('common/image/nav_btn_user.png'),
            href: '',
          }
        },
        plus_btn: require('common/image/suspend_btn.png')
      }
    },
    components: {
      Banner,
      Scroll,
      TopHeader,
      BottomFooter
    },
    created () {
      // 获取手机号存VUEX
      this.$store.commit('save', '17764587901')
      
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
      },
      topHeader_close () {
        console.log('close')
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
        background: white;
        .title {
          font-size: @font-size-item_title;
          height: .6rem;
          font-weight: bold;
          line-height: .6rem;
        }
        .det {
          display: flex;
          padding: .4rem .05rem .3rem;
          justify-content: center;
          .item {
            width: 1.45rem;
            margin-right: .4rem;
            text-align: center;
            &:last-child {
              margin-right: 0;
            }
  
            .icon {
              height: .48rem;
              width: .48rem;
              margin-bottom: .2rem;
            }
            .name {
              font-size: @font-size-smail;
            }
          }
        }
      }
      .banner {
        .needsclick {
          height: 2rem;
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
