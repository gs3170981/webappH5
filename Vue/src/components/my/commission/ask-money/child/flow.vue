<!--模板文件-->
<template>
  <slide-page class="ASK_MONEY_HISTORY" :klass="'ASK_MONEY_HISTORY'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div style="padding-bottom: .9rem;">
        <header class="header">
          <p class="start">
            <span class="circle"></span>
            <span class="name">发起提现申请</span>
          </p>
          <p class="handle">
            <img class="icon" :src="header.icon"/>
            <span class="name" style="margin-top: -.08rem;">系统处理中<br /><span style="color: #979899;font-size: .26rem;">预计1个工作日到账</span></span>
          </p>
          <p class="end">
            <span class="circle"></span>
            <span class="name" style="color: #979899;">到账成功</span>
          </p>
        </header>
        <ul class="list">
          <li class="item" v-for="t in list">
            <span class="title" v-text="t.title"></span>
            <span class="val" v-text="t.val"></span>
          </li>
        </ul>
        <p class="submit" @click="submit_btn">完成</p>
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
            icon: require('common/image/nav_btn_back.png'),
            href: '/my_commission/ask_money'
          },
          title: '佣金提现',
          right: {
            icon: '',
            href: ''
          }
        },
        header: {
          icon: require('common/image/timer.png')
        },
        list: [
          {
            title: '提现金额 ',
            val: '￥8000.00'
          }, {
            title: '手续费 ',
            val: '￥10.00'
          }, {
            title: '到账银行卡',
            val: '南京银行(1903)'
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

    },
    methods: {
      submit_btn () {
        this.$router.push({path: '/my_commission'})
      }
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
        margin-top: .87rem;
        padding: .7rem .75rem;
        background: white;
        .name {
          font-size: .3rem;
          color: #626364;
        }
        .start {
          align-items: top;
          height: 1.15rem;
          display: flex;
          position: relative;
          .circle {
            width: .3rem;
            height: .3rem;
            border-radius: 50%;
            margin: 0 .45rem 0 .1rem;
            background: @background-header;
          }
          &:before {
            content: '';
            position: absolute;
            height: .8rem;
            bottom: .02rem;
            width: 1px;
            left: .24rem;
            border-right: .01rem dotted #55a2fb;
          }
        }
        .handle {
          align-items: top;
          display: flex;
          position: relative;
          line-height: .45rem;
          height: 1.6rem;
          .icon {
            width: .52rem;
            height: .52rem;
            margin-right: .35rem;
          }
          &:before {
            content: '';
            position: absolute;
            height: 1rem;
            bottom: .02rem;
            width: 1px;
            left: .24rem;
            border-right: .01rem dotted #979899;
          }
        }
        .end {
          align-items: top;
          display: flex;
          position: relative;
          .circle {
            width: .3rem;
            height: .3rem;
            border-radius: 50%;
            margin: 0 .45rem 0 .1rem;
            background: #dedfe0;
          }
        }
      }
      .list {
        margin-top: .2rem;
        padding: 0 .25rem;
        color: #626364;
        background: white;
        .item {
          align-items: center;
          height: 1rem;
          border-bottom: .01rem solid #f2f4f5;
          display: flex;
          .title {
            font-size: .3rem;
          }
          .val {
            margin-left: auto;
            font-size: .3rem;
            color: #313233;
          }
        }
      }
      .submit {
        display: block;
        background: @background-header;
        color: white;
        width: 5rem;
        height: .84rem;
        border-radius: .5rem;
        box-shadow: 0px .1rem .16rem rgba(97, 172, 251, 0.4);
        margin: 1.7rem auto 1rem;
        text-align: center;
        line-height: .84rem;
        font-size: .34rem;
      }
    }
  }
</style>