<template>
  <slide-page class="ASK_MONEY" :klass="'ASK_MONEY'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll ref="scroll" class="row-content"><!-- :data="record"-->
      <div style="padding-bottom: .9rem;">
        <p class="blank"><img class="logo" :src="other.icon" alt="" />工商银行（0581）<img class="icon" :src="other.icon1" alt="" /></p>
        <dl class="det">
          <dt class="title">提现金额</dt>
          <dd class="money">
            <span style="font-size: .54rem;">￥</span>
            <span class="input" v-text="money" @click="key_board = true"></span>
            <img class="icon" v-if="money" @click="moneyClear" :src="other.icon3"/>
          </dd>
          <dd class="tips" v-if="money">额外扣除¥10元手续费</dd>
          <dd class="tips" v-else>可提佣金￥8000.00</dd>
        </dl>
        <p class="rek"><img class="icon" :src="other.icon2"/>提现请求系统统一在每月15日处理，请谅解。如15日为节假日，则顺延至下一个工作日。到账时间预计1个工作日！</p>
        <p class="submit" @click="submit_btn">提现</p>
      </div>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
    <!--数字键盘-->
    <key-board :show="key_board"></key-board>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import KeyBoard from 'base/key-board/key-board'
  import Scroll from 'base/scroll/scroll'
  export default {
    data () {
      return {
        key_board: false,
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/my_commission'
          },
          title: '佣金提现',
          right: {
//          icon: require('common/image/nav_btn_help.png'),
//          href: ''
          }
        },
        money: '',
        other: {
          icon: require('common/image/card_bank_gs.png'),
          icon1: require('common/image/det_btn_more.png'),
          icon2: require('common/image/card_icon_tip.png'),
          icon3: require('common/image/card_icon_close.png')
        }
      }
    },
    components: {
      TopHeader,
      Scroll,
      KeyBoard,
      SlidePage
    },
    created () {

    },
    methods: {
      submit_btn () {
        this.$router.push({path: '/my_commission/ask_money/tied_result', query: {
          is: true,
        }})
      },
      moneyClear () {
        
      },
      inputTouch () {
        
      }
    }
  }
</script>

<style scoped lang="less">
  .ASK_MONEY {
    .header {
      background: @background-header;
    }
    .row-content {
      background: @color-hui1;
      .blank {
        margin: 1.1rem 0 .2rem;
        height: 1rem;
        background: white;
        display: flex;
        font-size: @font-size-item_title;
        padding: 0 .25rem;
        align-items: center;
        .logo {
          width: .6rem;
          height: .6rem;
          margin-right: .2rem;
        }
        .icon {
          margin-left: auto;
          width: .14rem;
          height: .22rem;
        }
      }
      .det {
        padding: 0 .25rem;
        background: white;
        .title {
          height: 1rem;
          line-height: 1rem;
          color: #626364;
        }
        .money {
          position: relative;
          display: flex;
          height: .9rem;
          line-break: .9rem;
          align-items: center;
          border-bottom: .01rem solid #f2f4f5;
          .input {
            height: 100%;
            overflow: hidden;
            padding-right: .5rem;
            font-size: .7rem;
            flex: 1;
          }
          .icon {
            position: absolute;
            right: 0;
            height: .28rem;
            width: .28rem;
          }
        }
        .tips {
          margin-top: 0;
          color: #979899;
          height: .9rem;
          line-height: .9rem;
        }
      }
      .rek {
        margin-top: .35rem;
        display: flex;
        align-items: top;
        color: #b1b2b3;
        font-size: @font-size-smail;
        line-height: .42rem;
        padding: 0 .25rem;
        .icon {
          margin-top: .05rem;
          height: .36rem;
          margin-right: .2rem;
          width: .36rem;
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
        margin: .45rem auto 1rem;
        text-align: center;
        line-height: .84rem;
        font-size: .34rem;
      }
    }
  }
  
</style>