<template>
  <slide-page class="more-det">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll">
      <!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <!--TODO 有bug，高度计算有误，暂时先这样使用-->
      <div style="padding-bottom: .9rem;">
        <header class="title row-border-bottom">
          <img class="icon" :src="icon" />
          <h3 class="name" v-text="title"></h3>
          <div v-if="money >= 0" class="money">+{{ money }}</div>
          <div v-else class="money" style="color: black;">{{ money }}</div>
        </header>
        <ul class="det row-border-bottom">
          <li class="item" v-for="t in item">
            <h5 class="name" v-text="t.title"></h5>
            <span class="val" v-text="t.val"></span>
          </li>
        </ul>
        <ul class="det">
          <li class="item" v-for="t in timer">
            <h5 class="name" v-text="t.title"></h5>
            <span class="val" v-text="t.val"></span>
          </li>
        </ul>
      </div>
    </scroll>
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
            icon: 'fa-angle-left',
            href: '/my_commission/more'
          },
          title: '佣金详情',
          right: {
            icon: '',
            href: ''
          }
        },
        icon: require('common/image/home_icon_loan.png'),
        title: '臻商贷',
        money: '700.00',
        item: [
          {
            title: '订单编号',
            val: 'JXAN-0102180423003'
          }, {
            title: '店铺名称',
            val: '张三丰面馆'
          }, {
            title: '用户姓名',
            val: '张三丰'
          }, {
            title: '用户手机',
            val: '18968158999'
          }, {
            title: '放款金额',
            val: '￥20000.00'
          }, {
            title: '借款期限',
            val: '6个月'
          }, {
            title: '冻结佣金',
            val: '￥300.00'
          }, {
            title: '解冻时间',
            val: '2018-10-22'
          }, {
            title: '可提佣金',
            val: '￥200.00'
          }
        ],
        timer: [
          {
            title: '入账时间',
            val: '2018-05-16 15:02'
          }, {
            title: '放款时间',
            val: '2018-04-24 15:02'
          }
        ]
      }
    },
    components: {
      TopHeader,
      Scroll,
      SlidePage
    },
    created () {

    }
  }
</script>

<style lang="less" scoped>
  .more-det {
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
          margin-left: auto;
          font-weight: bold;
          color: @color-org;
        }
      }
      .det {
        padding: .22rem;
        line-height: .65rem;
        background: white;
        .item {
          height: .65rem;
          .name {
            color: #979899;
            float: left;
          }
          .val {
            float: right;
          }
        }
      }
    }
  }
</style>