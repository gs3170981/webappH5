<template>
  <slide-page class="MONEY_ITEM_INFO" :klass="'MONEY_ITEM_INFO'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容-->
    <scroll ref="scroll" class="row-content" :data="item"><!-- :data="record"-->
      <div style="padding-bottom: .9rem;">
        
        <header class="header">
          <h1 class="money"><span style="">￥</span>{{ header.money }}</h1>
          <p class="tips">历史逾期：{{ header.ago }}次</p>
          <router-link tag="p" class="btn row-item" :to="'/moneyItem_info/pay'">立即付款</router-link>
        </header>
        
        <ul class="much">
        	<li class="items" v-for="t in much" :key="t.id">
        	  <p class="val" v-text="t.val"></p>
        	  <p class="title" v-text="t.title"></p>
        	</li>
        </ul>
        
        <banner v-if="banner.length" class="row-slider-wrapper" :dotsIndex="bannerIndexStyle">
          <div class="banner" v-for="t in banner">
            <a :href="t.url">
              <img class="needsclick" @load="loadImage" :src="t.href">
            </a>
          </div>
        </banner>
        
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
          money: '1000.00',
          ago: 2
        },
        much: [
          {
            id: 'a',
            val: '1000.00',
            title: '下月应付(元)'
          }, {
            id: 'b',
            val: '3700.00',
            title: '分期总额(元)'
          }, {
            id: 'c',
            val: '2700.00',
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
    created () {
      API_zzg_zedHome({
        mobile: this.$store.state.personal_info.phone
      }, res => {
        this.data = res
        console.log(res)
      })
    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh() // 加载img的时候，需要重新计算scroll高度
        }
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
        margin-top: 1.3rem;
        height: 2.8rem;
        color: white;
        text-align: center;
        .money {
          font-size: .56rem;
          line-height: .73rem;
        }
        .tips {
          color: #fed6ae;
          line-height: .45rem;
        }
        .btn {
          margin: .3rem auto 0;
          width: 2.2rem;
          height: .65rem;
          line-height: .65rem;
          background: #5be7b1;
          border-radius: .3rem;
        }
      }
      .much {
        height: 1.2rem;
        overflow: hidden;
        color: white;
        display: flex;
        background: linear-gradient(90deg, #257df6 0%, #27a7f8 100%);
        align-items: center;
        text-align: center;
        .items {
          width: 33%;
          position: relative;
          float: left;
          .val {
            font-size: @font-size-item_title;
          }
          .title {
            margin-top: .15rem;
            color: rgba(255, 255, 255, 0.5);
            font-size: @font-size-smail;
          }
          &:after {
            right: 0;
            content: '';
            position: absolute;
            width: .04rem;
            height: .4rem;
            opacity: 1;
            border-radius: .5rem;
            background: #62abf9;
            top: .15rem;
          }
          &:last-child {
            &:after {
              opacity: 0;
            }
          }
        }
      }
      .banner {
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