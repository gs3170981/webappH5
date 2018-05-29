<template>
  <slide-page class="MONEY_ITEM_INFO" :klass="'MONEY_ITEM_INFO'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容-->
    <scroll ref="scroll" class="row-content" :data="item"><!-- :data="record"-->
      <div style="padding-bottom: .9rem;">
        
        <header class="header">
          <h1 class="money"><span>￥</span>{{ header.money }}</h1>
          <p class="tips" v-if="header.his_ago">历史逾期：{{ header.his_ago }}次</p>
          <p class="tips" v-if="header.now_ago">当前逾期：{{ header.now_ago }}次</p>
          <router-link tag="p" class="btn row-item" :to="'/moneyItem_info/pay'">立即付款</router-link>
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
          <router-link tag="span" class="btn row-item" :to="{ path:'/moneyItem_info/pay',query: {type: 'early'} }">提前付款</router-link>
        </p>
        
        <ul class="item">
          <li v-for="(t, i) in item" class="list">
            <span class="i">{{ i }}</span>
            <span class="title">订单编号</span>
            <span class="number" v-text="t.number"></span>
          </li>
        </ul>
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
  import { API_zzg_zedHome } from 'api/config.js'
  import { M_NumberPlusReduce } from 'common/js/methods.js'
  export default {
    data () {
      return {
        bannerIndexStyle: {
          background: '#4091f7'
        },
        data: {},
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
          money: '0.00',
          his_ago: 1,
          now_ago: 1
        },
        much: [
          {
            id: 'a',
            val: '0.00',
            title: '下月应付(元)'
          }, {
            id: 'b',
            val: '0.00',
            title: '分期总额(元)'
          }, {
            id: 'c',
            val: '0.00',
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
        item: [
          {
            number: 'JXAB-0101180512003'
          }, {
            number: 'JXAB-0101180512003'
          }, {
            number: 'JXAB-0101180512003'
          }, {
            number: 'JXAB-0101180512003'
          }, {
            number: 'JXAB-0101180512003'
          }, {
            number: 'JXAB-0101180512003'
          }, {
            number: 'JXAB-0101180512003'
          }, {
            number: 'JXAB-0101180512003'
          }
        ]
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
        console.log(to.query.call)
        if (to.query.call) {
          this.API_zzg_zedHome()
        }
      }
    },
    created () {
      this.API_zzg_zedHome()
    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh() // 加载img的时候，需要重新计算scroll高度
        }
      },
      API_zzg_zedHome () {
        API_zzg_zedHome({
          mobile: this.$store.state.user.phone
        }, res => {
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
          
          this.header.his_ago = res.historyOverdueCount
          this.header.now_ago = res.overdueCount
          
          this.$store.commit('submit', res)
        })
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
        .tips {
          color: #fed6ae;
          line-height: .45rem;
        }
        .btn {
          margin-top: .3rem;
          /*margin: .3rem auto 0;*/
          width: 2.2rem;
          height: .65rem;
          line-height: .65rem;
          background: #5be7b1;
          border-radius: .3rem;
          margin-bottom: .2rem;
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
        padding: .25rem .25rem .4rem;
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