<template>
  <slide-page class="MY_ORDER_ITEM" :klass="'MY_ORDER_ITEM'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容--><!-- :data="record"-->
    <ul class="header">
      <li class="item" :class="{ active: t.key == type }" v-for="(t, i) in nav" v-text="t.title" @click="navClick(i)"></li>
    </ul>
    <scroll ref="scroll" class="row-content">
      <div style="padding-bottom: .9rem;">
        <banner class="row-slider-wrapper" :interval="0" ref="banner" :autoPlay="false" :loop="false" @touchEnd="touchEnd"><!--:dotsIndex="bannerIndexStyle"-->
          <!--<scroll class="banner row-content" ref="scroll" v-for="t in banner" :data="t.item">-->
            <ul class="banner" v-for="t in nav">
              <li class="item" v-for="tt in t.list">
                <p class="title"><img class="icon" :src="other.item.logo_icon" />{{ tt.companyName }}</p>
                <ul class="items">
                	<li class="line">
                	  <label class="name">产品名称:</label>
                	  <span class="val"><img class="i" :src="other.item.title_icon" /></span>
                	</li>
                	<li class="line">
                    <label class="name">金额期数:</label>
                    <span class="val"></span>
                  </li>
                  <li class="line">
                    <label class="name">订单编号:</label>
                    <span class="val"></span>
                  </li>
                </ul>
                <img class="type" src=""/>
              </li>
              <li class="none" v-if="t.list.length == 0">
                <img class="icon" :src="other.icon" alt="" />
                <p class="tips" v-if="t.url">暂无订单</p>
                <p class="tips" v-else>待开发</p>
              </li>
            </ul>
          <!--</scroll>-->
        </banner>
      </div>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
    <!--底部-->
    <!--<bottom-footer class="footer"></bottom-footer>-->
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Banner from 'base/banner/banner'
  import Scroll from 'base/scroll/scroll'
//import BottomFooter from 'base/bottom-footer/bottom-footer'
//import { M_NumberPlusReduce } from 'common/js/methods.js'
  export default {
    data () {
      return {
//      bannerIndexStyle: {
//        background: '#4091f7'
//      },
        type: this.$route.query.type, // 获取当前路由?传参
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/'
          },
          title: '我的订单',
          right: {
            icon: '',
            href: ''
          }
        },
        other: {
          icon: require('common/image/pay_img_default.png'),
          item: {
            logo_icon: require('common/image/order_icon_company.png'),
            title_icon: require('common/image/order_icon_stages.png'),
            
            '0,1': require('common/image/seal_icon_first.png'), // 待初审     0(待处理), 1（提交中）
            // 2 初审中 ？
            '3': require('common/image/seal_icon_freject.png'), // 初审驳回      3（初审驳回）
            // 4 已终止 ？

            // 5 复审中 ？
            // 6 复审驳回 ？
            // 7 审核通过 ？
//          title_icon: require('common/image/seal_icon_fveto.png'), // 初审否决
//          title_icon: require('common/image/seal_icon_overdue.png'), // 逾期中
//          title_icon: require('common/image/seal_icon_stages.png'), // 分期中
//          final_icon: require('common/image/seal_icon_final.png'), // 待终审
//          title_icon: require('common/image/seal_icon_pass.png'), // 终审通过
//          title_icon: require('common/image/seal_icon_sign.png'), // 已签约
//          title_icon: require('common/image/seal_icon_settle.png'), // 业务结清
//          title_icon: require('common/image/seal_icon_veto.png'), // 终审否决
//          title_icon: require('common/image/seal_icon_wstop.png'), // 待终止
//          title_icon: require('common/image/seal_icon_stop.png'), // 业务终止
          }
        },
        nav: [
          {
            title: '审核中',
            key: '0',
            url: '/m/zed/queryCheckingOrder',
            data: {
              leaderPhone: this.$store.state.user.phone,
              pageIndex: 0,
              pageSize: 10
            },
//          list: [{companyName:'0'},{companyName:'四川好管家'},{companyName:'四川好管家'}]
            list: this.$store.state.order['0'].list
          }, {
            title: '待签约',
            key: '1',
            url: '',
            list: this.$store.state.order['1'].list
          }, {
            title: '待放款',
            key: '2',
            list: this.$store.state.order['2'].list,
            url: ''
          }, {
            title: '待付款',
            key: '3',
            list: this.$store.state.order['3'].list,
            url: '/m/zzg/queryPayMent'
          }, {
            title: '已结束',
            key: '4',
            list: this.$store.state.order['4'].list,
            url: '/m/zed/queryHasendOrderList',
          }
        ]
      }
    },
    components: {
      TopHeader,
      Scroll,
//    BottomFooter,
      Banner,
      SlidePage
    },
//  watch: {
//   '$route' (to, from) { // 监听到 某个 数据 传回call的时候，该页面进行重新加载
//      if (to.query.call) {
//        console.log('监听到call为true，重新AJAX获取数据')
//        this.getData()
//      }
//    }
//  },
    created () {
//    this.touchEnd()
//    this.getList(this.type)
    },
    watch: {
      type (to, from) {
//      if (to != from) {
//        debugger
//        console.log(from)
//        setTimeout(() => {
            this.$refs.banner._go(+to)
//        }, 20)
//      }
      }
    },
    mounted () {
      setTimeout(() => {
//      this.$refs.banner._go(this.type)

        this.touchEnd(this.type, true)
      }, 20)
    },
    methods: {
      touchEnd (index, is) {
        // 这边ajax拿到数据后，修改列表高度 --- 问题是如何正确修改高度值
        if (!is && this.type == index) {
          return
        }
        console.log(index)
        let obj = this.nav[index]
        obj.url && this.AJAX({
          url: obj.url,
          data: obj.data,
          success: (res) => {
            obj.list = res.list
//          this.$store.commit('submit', res, index + '')
            this.$store.commit('submit', {
              res: res,
              index: index
            })
          }
        })
        
//      console.log(index)
//      setTimeout(() => {
          this.type = index
//      }, 200)
        this.$refs.scroll.scrollTo(0, 0, 500)
        this.$refs.banner._go(index)

//      const D = document
//      let obj = D.getElementsByClassName('MY_ORDER_ITEM-banner')
//      let h = window.getComputedStyle(obj[index], null).height
////      debugger
//      obj[0].style.height = h
//      this.$refs.scroll.refresh()
      },
      navClick (index) {
        this.touchEnd(index)
        this.type = index
      }
//    loadImage() {
//      if (!this.checkloaded) {
//        this.checkloaded = true
//        this.$refs.scroll.refresh() // 加载img的时候，需要重新计算scroll高度
//      }
//    },
    }
  }
</script>

<style lang="less" scoped>
  .MY_ORDER_ITEM {
    /*background: @background-header!important;*/
    .top {
      background: @background-header;
    }
    .header {
      margin-top: .87rem;
      display: flex;
      justify-content: center;
      line-height: .72rem;
      height: .8rem;
      background: white;
      font-size: @font-size-item_det1;
      color: #979899;
      
      .item {
        margin: .04rem .3rem 0;
        height: .7rem;
      }
      .active {
        border-bottom: .01rem solid #4e99fd;
        color: #4e99fd;
      }
    }
    .row-content {

      
      .row-slider-wrapper {
        /*background: white;*/
        .banner {
          min-height: 15rem;
          /*overflow: hidden;*/
          .item {
            height: 2.8rem;
          }
          .none {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .icon {
              margin: 1rem 0 .5rem;
              height: 1.4rem;
              width: 2.24rem;
            }
            .tips {
              color: #B6B6B6;
            }
          }
        }
      }
      /*.banner {
        margin-top: .68rem;
        background: white;
        padding-top: .68rem;
        .needsclick {
          height: 2rem;
        }
      }*/
    }
    /*.footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: white;
      z-index: -1;
      padding-top: 2.5rem;
    }*/
  }
</style>