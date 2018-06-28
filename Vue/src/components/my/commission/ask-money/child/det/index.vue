<template>
  <slide-page class="ASK_MONEY_HISTORY_DET" :klass="'ASK_MONEY_HISTORY_DET'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content">
      <!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <!--TODO 有bug，高度计算有误，暂时先这样使用-->
      <div>
        <header class="title row-border-bottom"> <img class="icon" :src="icon" />
          <h3 class="name" v-text="title"></h3>
          <div v-if="money >= 0" class="money">+{{ money }}</div>
          <div v-else class="money" style="color: black;">{{ money }}</div>
        </header>
        <ul class="det row-border-bottom">
          <li class="item" v-for="t in item">
            <h5 class="name" v-text="t.title"></h5> <span class="val" v-text="t.val"></span> </li>
        </ul>
        <ul class="det">
          <li class="item" v-for="t in timer">
            <h5 class="name" v-text="t.title"></h5> <span class="val" v-text="t.val"></span> </li>
        </ul>
      </div>
    </scroll>
  </slide-page>
</template>
<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Scroll from 'base/scroll/scroll'
  import { M_touchMove } from 'common/js/methods.js'
  export default {
    data() {
      return {
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/my_commission/ask_money/history'
          },
          title: '提现详情',
          right: {
            icon: '',
            href: ''
          }
        },
        icon: require('common/image/overview_icon_cash.png'),
        title: '提现',
        money: '-490.00',
        item: [{
          title: '提现单号',
          val: 'YJTX-05180423003'
        }, {
          title: '提现金额',
          val: '￥500.00'
        }, {
          title: '手 续 费',
          val: '￥10.00'
        }, {
          title: '提现银行',
          val: '南京银行(1903)'
        }],
        timer: [{
          title: '申请时间',
          val: '2018-05-16 15:02'
        }, {
          title: '出款时间',
          val: '2018-05-16 15:02'
        }]
      }
    },
    components: {
      TopHeader,
      Scroll,
      SlidePage
    },
    created() {},
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
  .ASK_MONEY_HISTORY_DET {
    background: @color-hui1;
    .header {
      background: @background-header;
    }
    .row-content {
      margin-top: .9rem;
      .title {
        padding: 0 .3rem;
        height: 1rem;
        overflow: hidden;
        display: flex;
        background: white;
        align-items: center;
        .icon {
          height: .54rem;
          width: .58rem;
          margin-right: .2rem;
        }
        .name {
          font-size: @font-size-item_title;
        }
        .money {
          font-size: .34rem;
          margin-left: auto;
          font-weight: bold;
          color: @color-org;
        }
      }
      .det {
        padding: .22rem .3rem;
        line-height: .65rem;
        background: white;
        .item {
          height: .65rem;
          .name {
            color: #979899;
            float: left;
            font-size: .26rem;
          }
          .val {
            color: #313233;
            font-size: .26rem;
            float: right;
          }
        }
      }
    }
  }
</style>