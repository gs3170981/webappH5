<template>
  <slide-page class="ASK_MONEY_HISTORY" :klass="'ASK_MONEY_HISTORY'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div style="padding-bottom: .9rem;">
        <header class="header">
          <h1 class="money" v-text="header.money"></h1>
          <p class="timer">
            <span class="start" v-text="header.timerS"></span>
            <img class="icon" :src="header.icon" />
            <span class="end" v-text="header.timerE"></span>
          </p>
        </header>
        <ul class="list">
          <router-link tag="li" v-for="(t, i) in list" :key="i" class="item" to="/my_commission/ask_money/history/det">
            <img class="icon" :src="other.icon[t.type]"/>
            <dl class="det">
              <dt class="title" v-text="t.title"></dt>
              <dd class="timer" v-text="t.timer"></dd>
            </dl>
            <span class="money" v-text="t.money"></span>
          </router-link>
        </ul>
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
  export default {
    data () {
      return {
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/my_commission/ask_money'
          },
          title: '提现记录',
          right: {
            icon: require('common/image/nav_btn_calendar.png'),
            href: ''
          }
        },
        other: {
          icon: {
            '0': require('common/image/overview_icon_cash.png')
          }
        },
        header: {
          money: '-1700.00',
          timerS: '2017.05.02',
          timerE: '2018.04.02',
          icon: require('common/image/history_icon_goto.png')
        },
        list: [
          {
            type: 0,
            title: '佣金提现-到南京银行(1903)',
            timer: '2018-4-17 16:40:02',
            money: '-500.00'
          }, {
            type: 0,
            title: '佣金提现-到南京银行(1903)',
            timer: '2018-4-17 16:40:02',
            money: '-500.00'
          }, {
            type: 0,
            title: '佣金提现-到南京银行(1903)',
            timer: '2018-4-17 16:40:02',
            money: '-500.00'
          }, {
            type: 0,
            title: '佣金提现-到南京银行(1903)',
            timer: '2018-4-17 16:40:02',
            money: '-500.00'
          }, {
            type: 0,
            title: '佣金提现-到南京银行(1903)',
            timer: '2018-4-17 16:40:02',
            money: '-500.00'
          }
        ]
      }
    },
    components: {
      SlidePage,
      Scroll,
      TopHeader
    },
    created () {

    }
  }
</script>

<style lang="less" scoped>
  .ASK_MONEY_HISTORY {
    background: @color-hui1;
    .top {
      background: @background-header;
    }
    .row-content {
      .header {
        background: @background-header;
        text-align: center;
        margin-top: .87rem;
        .money {
          height: .75rem;
          line-height: .75rem;
          color: #feefa6;
          font-weight: bold;
          font-size: .4rem;
        }
        .timer {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          padding-bottom: .35rem;
          height: .5rem;
          .start {
            
          }
          .icon {
            padding: 0 .15rem;
            width: .44rem;
            height: .08rem;
          }
          .end {
            
          }
        }
      }
      .list {
        background: white;
        padding: 0 .25rem;
        .item {
          height: 1.2rem;
          display: flex;
          align-items: center;
          border-bottom: .01rem solid #f2f4f5;
          .icon {
            width: .58rem;
            height: .54rem;
            margin-right: .2rem;
          }
          .det {
            .title {
              height: .4rem;
              color: #313233;
              line-height: .4rem;
            }
            .timer {
              height: .4rem;
              line-height: .4rem;
              font-size: .24rem;
              color: #b1b2b3;
            }
          }
          .money {
            margin-left: auto;
            font-size: .34rem;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>