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
                <p>{{ tt.companyName }}</p>
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
            list: [{companyName:'0'},{companyName:'四川好管家'},{companyName:'四川好管家'},{companyName:'四川好管家'},{companyName:'四川好管家'},{companyName:'四川好管家'},{companyName:'四川好管家'}]
          }, {
            title: '待签约',
            key: '1',
            url: '',
            list: [{companyName:'1'},{companyName:'四川好管家'},{companyName:'四川好管家'}]
          }, {
            title: '待放款',
            key: '2',
            list: [{companyName:'2'},{companyName:'四川好管家'},{companyName:'四川好管家'}],
            url: ''
          }, {
            title: '待付款',
            key: '3',
            list: [{companyName:'3'},{companyName:'四川好管家'},{companyName:'四川好管家'}],
            url: '/m/zzg/queryPayMent'
          }, {
            title: '已结束',
            key: '4',
            list: [{companyName:'4'},{companyName:'四川好管家'},{companyName:'四川好管家'}],
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
//    this.getList(this.type)
    },
    watch: {
      type (to) {
        console.log(to)
        this.$refs.banner._play(to + '')
      }
    },
    mounted () {
      setTimeout(() => {
        this.$refs.banner._play(this.type)
      }, 20)
    },
    methods: {
      getList (index) { // ajax
        let url = this.nav[this.type].url
        let data = this.nav[this.type].data
        if (!url) {
          console.warn('后台接口暂未支持')
          return
        }
        this.AJAX({
          url: url,
          data: data,
          success: res => {
            this.nav[this.type].list = res.list
            console.log(res)
          }
        })
      },
      touchEnd (index) {
        // 这边ajax拿到数据后，修改列表高度 --- 问题是如何正确修改高度值
//      console.log(index)
        this.type = index

//      this.$refs.banner._play(2)
//      const D = document
//      let obj = D.getElementsByClassName('MY_ORDER_ITEM-banner')
//      let h = window.getComputedStyle(obj[index], null).height
////      debugger
//      obj[0].style.height = h
//      this.$refs.scroll.refresh()
      },
      navClick (index) {
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
          .item {
            height: 2.8rem;
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