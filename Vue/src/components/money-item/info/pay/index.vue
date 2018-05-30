<template>
  <slide-page class="MONEY_ITEM_INFO_PAY" :klass="'MONEY_ITEM_INFO_PAY'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容-->
    <scroll ref="scroll" class="row-content"><!-- :data="record"-->
      <div style="padding-bottom: .9rem;">
        
        <header class="header row-border-bottom">
          <div class="card" :style="header.style">
            <p class="title" v-text="data.title"></p>
            <h1 class="money"><span>￥</span>{{ data.money }}</h1>
            <!--<h1 class="money"><span>￥</span>{{ count }}</h1>-->
            <ul class="det">
              <li class="item" v-for="t in data.item">
                <p class="name" v-text="t.title"></p>
                <p class="val" v-text="t.val"></p>
              </li>
            </ul>
          </div>
        </header>
        <ul class="payType">
          <li v-for="t in options" class="item" @click="radio_checked('MONEY_ITEM_INFO_PAY_radio_checked', 'checkValue')">
            <img class="icon" :src="t.icon" />
            <span class="row-checkbox MONEY_ITEM_INFO_PAY_radio_checked"></span>
          </li>
        </ul>
        <div style="position: relative;">
          <p v-if="type" class="tips">
            <img class="icon" :src="icon.err" />
            <span class="title">提前付款是指针对所有未出账单付款，不能提前支付部分账单，提前付款无任何手续费！</span>
          </p>
        </div>
        <p class="pay-btn" @click="goPay">去付款</p>
      </div>
    </scroll>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Scroll from 'base/scroll/scroll'
  import { radio_checked } from 'common/js/mixins.js'
  
  export default {
//  computed: {
//    count() {
//      return this.$store.state.personal_info.count
//    }
//  },
    mixins: [radio_checked],
    data () {
      return {
        icon: {
          err: require('common/image/pay_icon_tip.png')
        },
        options: [
          {
            icon: require('common/image/pay_logo_alipay.png'),
          }, {
            icon: require('common/image/pay_logo_union.png'),
          }
        ],
        val: '',
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back_black.png'),
            href: '/moneyItem_info'
          },
          title: '在线付款',
          title_style: {
            color: 'black'
          },
          right: {
            icon: '',
            href: ''
          }
        },
        type: '',
        header: {
          style: {
            background: "url(" + require('common/image/pay_bg.png') + ")top center",
          }
        },
        data: {
          title: '本月应付',
          money: this.$store.state.pay.currentAmount,
          item: [
            {
              title: '下月应付(元)',
              val: this.$store.state.pay.nextMonthAmount
            }, {
              title: '分期总额(元)',
              val: this.$store.state.pay.amount
            }, {
              title: '剩余未付(元)',
              val: this.$store.state.pay.remainAmount
            }
          ]
        }
      }
    },
    components: {
      TopHeader,
      Scroll,
      SlidePage
    },
    created () {
      this.type = this.$route.query.type
      if (this.type) {
        this.top_header.title = '提前付款'
        this.data = {
          title: '应付金额',
          money: this.$store.state.pay.remainAmount,
          item: [
            {
              title: '分期总额(元)',
              val: this.$store.state.pay.amount
            }, {
              title: '剩余未付(元)',
              val: this.$store.state.pay.remainAmount
            }
          ]
        }
      }
    },
    mounted () {
      this.radio_checked('MONEY_ITEM_INFO_PAY_radio_checked', 'checkValue', 0) // 传下标默认选中
    },
    methods: {
      goPay () {
        
        console.log(this.checkValue)
//      this.$router.push({path: '/moneyItem_info', query: {call: true}})
//      this.$store.commit('increment')
      }
    }
  }
</script>

<style lang="less" scoped>
  .MONEY_ITEM_INFO_PAY {
    /*background: @background-header!important;*/
    .top {
      background: white;
    }
    .row-content {
      .header {
        margin-top: .85rem;
        background: white;
        padding-top: .28rem;
        box-sizing: border-box;
        height: 4.2rem;
        .card {
          width: 6.9rem;
          height: 3.2rem;
          background-size: 100% 100%!important;
          border-radius: .2rem;
          color: white;
          box-sizing: border-box;
          text-align: center;
          box-shadow: .05rem .18rem .34rem rgba(65, 146, 248, 0.4);
          padding-top: .3rem;
          margin-left: .29rem;
          .title {
            height: .5rem;
            font-size: @font-size-item_title;
            line-height: .5rem;
            color: rgba(255, 255, 255, 0.5);
          }
          .money {
            height: .8rem;
            font-weight: bold;
            font-size: .56rem;
            line-height: .8rem;
          }
          .det {
            display: flex;
            justify-content: center;
            margin-top: .33rem;
            overflow: hidden;
            .item {
              width: 33%;
              float: left;
              .name {
                height: .44rem;
                color: rgba(255, 255, 255, 0.5);
                font-size: @font-size-smail;
                line-height: .44rem;
              }
              .val {
                height: .46rem;
                font-weight: bold;
                line-height: .46rem;
                font-size: .32rem;
              }
            }
          }
        }
      }
      .payType {
        padding: 0 .25rem;
        background: white;
        .item {
          border-bottom: .01rem solid #f2f4f5;
          line-height: 1.15rem;
          display: flex;
          align-items: center;
          height: 1.15rem;
          .icon {
            width: .84rem;
            height: .66rem;
          }
          .row-checkbox {
            margin-left: auto;
          }
        }
      }
      .tips {
        position: absolute;
        overflow: hidden;
        margin: .35rem .45rem 0 .3rem;
        line-height: .42rem;
        color: #b1b2b3;
        .icon {
          width: .32rem;
          height: .32rem;
        }
        .title {
          margin: -.07rem 0 0 .2rem;
          font-size: @font-size-smail;
          width: 6.2rem;
          float: right;
        }
      }
      .pay-btn {
        background: @background-header;
        color: white;
        width: 5rem;
        height: .84rem;
        border-radius: .5rem;
        box-shadow: 0px .1rem .16rem rgba(97, 172, 251, 0.4);
        margin: 3rem auto 1rem;
        text-align: center;
        line-height: .84rem;
        font-size: .34rem;
      }
    }
  }
</style>