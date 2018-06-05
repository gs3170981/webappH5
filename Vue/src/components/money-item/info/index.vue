<template>
  <slide-page class="MONEY_ITEM_INFO" :klass="'MONEY_ITEM_INFO'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容-->
    <scroll ref="scroll" class="row-content" :data="list"><!-- :data="record"-->
      <div style="padding-bottom: .9rem;">
        
        <header class="header">
          <img v-if="header.money === '0.00' && list[0]" class="icon" :src="header.icon" />
          <h1 v-else class="money"><span>￥</span>{{ header.money }}<span style="margin-left: .15rem;"></span></h1>
          <p class="tips" v-if="header.his_ago">历史逾期：{{ header.his_ago }}次</p>
          <p class="tips" v-if="header.now_ago">当前逾期：{{ header.now_ago }}次</p>
          <template v-if="!list[0]">
            <p class="tips" style="color: white;">暂无待付订单</p>
            <p class="btn row-item disabled-btn">立即付款</p>
          </template>
          <router-link v-else-if="header.now_ago" tag="p" class="btn row-item" style="background: #fbc25e;" :to="'/moneyItem_info/pay'">立即付款</router-link>
          <router-link v-else-if="header.money === '0.00' && list[0]" style="background: transparent;border: .01rem solid white;" tag="p" class="btn row-item" :to="{ path:'/moneyItem_info/pay',query: {type: 'early'} }">提前付款</router-link>
          <router-link v-else tag="p" class="btn row-item" :to="'/moneyItem_info/pay'">立即付款</router-link>
        </header>
        <ul class="much">
        	<li class="items" v-for="t in much" :key="t.id">
        	  <p class="val" v-text="t.val"></p>
        	  <p class="title" v-text="t.title"></p>
        	</li>
        </ul>
        <section class="banner">
          <banner v-if="banner.length" class="row-slider-wrapper" :dotsIndex="bannerIndexStyle">
            <div v-for="t in banner">
              <a :href="t.url">
                <img class="needsclick" @load="loadImage" :src="t.href">
              </a>
            </div>
          </banner>
        </section>
        
        
        <p class="order">
          <span class="title">全部待付订单</span>
          <router-link tag="span" v-if="list[0]" class="btn row-item" :to="{ path:'/moneyItem_info/pay',query: {type: 'early'} }">提前付款</router-link>
          <span class="btn row-item" v-else style="opacity: .5;">提前付款</span>
        </p>
        
        <ul v-if="list[0]" class="item">
          <li v-for="(t, i) in list" class="list" :key="t.orderNo">
            <span class="i">{{ i + 1 }}</span>
            <span class="title">订单编号</span>
            <span class="number" v-text="t.orderNo"></span>
          </li>
        </ul>
        <section v-else class="item_empty">
          <img :src="footer.icon" class="icon" />
          <p class="title">暂无待付订单</p>
        </section>
      </div>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
    <!--底部-->
    <bottom-footer class="footer"></bottom-footer>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Banner from 'base/banner/banner'
  import Scroll from 'base/scroll/scroll'
  import BottomFooter from 'base/bottom-footer/bottom-footer'
  import { M_NumberPlusReduce } from 'common/js/methods.js'
  export default {
    data () {
      return {
        bannerIndexStyle: {
          background: '#4091f7'
        },
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/'
          },
          title: '本月待付',
          right: {
            icon: '',
            href: ''
          }
        },
        header: {
          money: this.$store.state.pay.currentAmount,
          his_ago: this.$store.state.pay.historyOverdueCount,
          now_ago: this.$store.state.pay.overdueCount,
          icon: require('common/image/card_img_success1.png')
        },
        much: [
          {
            id: 'a',
            val: this.$store.state.pay.nextMonthAmount,
            title: '下月应付(元)'
          }, {
            id: 'b',
            val: this.$store.state.pay.amount,
            title: '分期总额(元)'
          }, {
            id: 'c',
            val: this.$store.state.pay.remainAmount,
            title: '剩余未付(元)'
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
        list: this.$store.state.pay.list,
        footer: {
          icon: require('common/image/pay_img_default.png')
        }
      }
    },
    components: {
      TopHeader,
      Scroll,
      BottomFooter,
      Banner,
      SlidePage
    },
    watch: {
     '$route' (to, from) { // 监听到 某个 数据 传回call的时候，该页面进行重新加载
        if (to.query.call) {
          console.log('监听到call为true，重新AJAX获取数据')
          this.getData()
        }
      }
    },
    created () {
      this.$store.commit('save', '17764587901') // 存手机号
      this.getData()
    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh() // 加载img的时候，需要重新计算scroll高度
        }
      },
      getData () {
        this.AJAX({
          url: '/m/zzg/zedHome',
          data: {
            mobile: this.$store.state.user.phone
          },
          success: res => {
            // 数字自增自减动画
            M_NumberPlusReduce([
              {
                e: this.header,
                val: 'money',
                now: res.currentAmount
              }, {
                e: this.much[0],
                val: 'val',
                now: res.nextMonthAmount
              }, {
                e: this.much[1],
                val: 'val',
                now: res.amount
              }, {
                e: this.much[2],
                val: 'val',
                now: res.remainAmount
              }
            ])
            // 改变导航栏的title
            if (res.historyOverdueCount > 1) {
              this.top_header.title = '累计待付'
            } else if (res.currentAmount === '0.00' && res.list[0]) {
              this.top_header.title = '本月账单已结清'
            }
            // 第一次要先赋值，data响应不到
            this.header.his_ago = res.historyOverdueCount
            this.header.now_ago = res.overdueCount
            this.list = res.list
            this.$store.commit('submit', res)
          }
        })
//      this.AJAX['/zzg/zedHome']({
//        mobile: this.$store.state.user.phone
//      }, res => {
//        // 数字自增自减动画
//        M_NumberPlusReduce([
//          {
//            e: this.header,
//            val: 'money',
//            now: res.currentAmount
//          }, {
//            e: this.much[0],
//            val: 'val',
//            now: res.nextMonthAmount
//          }, {
//            e: this.much[1],
//            val: 'val',
//            now: res.amount
//          }, {
//            e: this.much[2],
//            val: 'val',
//            now: res.remainAmount
//          }
//        ])
//        // 改变导航栏的title
//        if (res.historyOverdueCount > 1) {
//          this.top_header.title = '累计待付'
//        } else if (res.currentAmount === '0.00' && this.list[0]) {
//          this.top_header.title = '本月账单已结清'
//        }
//        // 第一次要先赋值，data响应不到
//        this.header.his_ago = res.historyOverdueCount
//        this.header.now_ago = res.overdueCount
//        this.list = res.list
//        this.$store.commit('submit', res)
//      })
      }
    }
  }
</script>

<style lang="less" scoped>
  .MONEY_ITEM_INFO {
    background: @background-header!important;
    .top {
      background: @background-header;
    }
    .row-content {
      .header {
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        margin-top: .9rem;
        /*margin-top: 1.3rem;*/
        height: 3.2rem;
        color: white;
        text-align: center;
        .money {
          font-size: .56rem;
          font-weight: bold;
          line-height: .73rem;
        }
        .icon {
          height: 1rem;
          width: 1rem;
          margin-bottom: .2rem;
        }
        .tips {
          color: #fed6ae;
          line-height: .45rem;
        }
        .btn {
          margin-top: .25rem;
          /*margin: .3rem auto 0;*/
          width: 2.2rem;
          height: .62rem;
          line-height: .62rem;
          background: #5be7b1;
          border-radius: .3rem;
          margin-bottom: .2rem;
        }
        .disabled-btn {
          background: rgba(89, 193, 252, 0.7);
          opacity: 0.7;
        }
      }
      .much {
        height: 1.2rem;
        margin: 0 .2rem;
        border-radius: .1rem;
        overflow: hidden;
        color: #44434b;
        display: flex;
        /*background: linear-gradient(90deg, #257df6 0%, #27a7f8 100%);*/
        background: white;
        box-shadow: 0 .05rem .2rem rgba(54, 113, 156, 0.1);;
        position: absolute;
        z-index: 1;
        width: 7.1rem;
        align-items: center;
        text-align: center;
        .items {
          width: 33%;
          position: relative;
          float: left;
          .val {
            font-weight: bold;
            font-size: @font-size-item_title;
          }
          .title {
            margin-top: .15rem;
            color: rgba(0, 0, 0, 0.5);
            font-size: @font-size-smail;
          }
          &:after {
            right: 0;
            content: '';
            position: absolute;
            width: .02rem;
            height: .66rem;
            opacity: 1;
            border-radius: .5rem;
            background: rgba(50, 177, 254, 0.1);
            top: 0rem;
          }
          &:last-child {
            &:after {
              opacity: 0;
            }
          }
        }
      }
      .banner {
        margin-top: .68rem;
        background: white;
        padding-top: .68rem;
        .needsclick {
          height: 2rem;
        }
      }
      .order {
        height: .88rem;
        padding: 0 .25rem;
        background: #f5f6f7;
        display: flex;
        align-items: center;
        .title {
          font-weight: bold;
          font-size: @font-size-item_title;
        }
        .btn {
          float: right;
          background: @background-header;
          border-radius: .3rem;
          font-size: @font-size-smail;
          text-align: center;
          color: white;
          margin-left: auto;
          height: .5rem;
          line-height: .5rem;
          width: 1.34rem;
        }
      }
      .item {
        background: white;
        padding: .25rem .25rem 2.5rem;
        .list {
          height: .85rem;
          line-height: .85rem;
          display: flex;
          align-items: center;
          .i {
            width: .34rem;
            height: .34rem;
            color: white;
            line-height: .34rem;
            text-align: center;
            border-radius: 50%;
            background: #65b6fe;
            font-size: .22rem;
          }
          .title {
            margin: -.02rem 0 0 .15rem;
          }
          .number {
            margin-left: auto;
            color: #979899;
          }
        }
      }
      .item_empty {
        background: white;
        height: 3.5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
        .icon {
          height: 1.4rem;
          width: 2.24rem;
        }
        .title {
          font-size: @font-size-item_det1;
          color: #b1b2b3;
          margin-top: .3rem;
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