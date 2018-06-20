<template>
  <slide-page class="MONEY_ITEM_INFO_PAY" :klass="'MONEY_ITEM_INFO_PAY'" :href="top_header.left.href">
    <!--头部-->
    <!--<top-header class="top" :opt="top_header" :class="{ top_active: order_type }"></top-header>-->
    <!--内容-->
    <scroll ref="scroll" class="row-content"><!-- :data="record"-->
      <div style="padding-bottom: .9rem;">
        
        <header class="header row-border-bottom">
          <div class="card" :style="header.style">
            <p class="title" v-text="data.title"></p>
            <h1 class="money"><span>￥</span>{{ data.money }}<span style="margin-left: .15rem;"></span></h1>
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
            <span class="row-checkbox MONEY_ITEM_INFO_PAY_radio_checked" style="border: 1px solid #4e99fd;"></span>
          </li>
        </ul>
        <div style="position: relative;">
          <p v-if="type" class="tips">
            <img class="icon" :src="icon.err" />
            <span class="title">提前付款是指针对所有未出账单付款，不能提前支付部分账单，提前付款无任何手续费！</span>
          </p>
        </div>
        <!--<p class="pay-btn row-item" @click="goPay()">去付款</p>-->
        <!--<a class="pay-btn row-item" :href="order_href" @click="goPay">去付款</a>-->
        <p class="pay-btn row-item" @click="goPay">去付款</p>
      </div>
      <order-type :type="order_type" :money="data.money" :iphone="iphone"></order-type>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
    <!--底部-->
    <bottom-footer class="footer"></bottom-footer>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
//import TopHeader from 'base/top-header/top-header'
  import Scroll from 'base/scroll/scroll'
  import OrderType from 'base/order-type/order-type'
  import BottomFooter from 'base/bottom-footer/bottom-footer'
  import { radio_checked } from 'common/js/mixins.js'
  import { M_Proms, M_visibilitychange } from 'common/js/methods.js'
  import { MessageBox } from 'mint-ui'
  
  export default {
//  computed: {
//    count() {
//      return this.$store.state.personal_info.count
//    }
//  },
    mixins: [radio_checked],
    data () {
      return {
        order_type: false, // 展示订单状态的开关
//      order_type: 'success', // 展示订单状态的开关
        icon: {
          err: require('common/image/pay_icon_tip.png')
        },
        inspect_timer: '',
        options: [
          {
            url: '/api/createOrder', // 支付宝
            icon: require('common/image/pay_logo_alipay.png')
          }
//        , {
//          url: '/api/createQuickOrder', // 银联
//          icon: require('common/image/pay_logo_union.png')
//        }
        ],
        val: '',
        order_href: '', // btn绑定上的值
        order: {
          href: '', // 用于判断是否选中的是支付宝，则给order_href赋值
          data: {},
          key: ''
        },
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back_black.png'),
            href: '/moneyItem_info?call=true'
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
        type: '', // 是否是提前还
        header: {
          style: {
            background: "url(" + require('common/image/pay_bg.jpg') + ")top center",
          }
        },
        data: {
          title: '本月应付',
//        money: this.$store.state.pay.currentAmount,
          money: this.$route.query.currentAmount,
          item: [
            {
              title: '下月应付(元)',
              val: this.$route.query.nextMonthAmount
            }, {
              title: '分期总额(元)',
              val: this.$route.query.amount
            }, {
              title: '剩余未付(元)',
              val: this.$route.query.remainAmount
            }
          ]
        },
        iphone: this.$route.query.mobile
      }
    },
    components: {
//    TopHeader,
      Scroll,
      OrderType,
      BottomFooter,
      SlidePage
    },
//  watch: {
//   '$route' (to, from) { // 监听到 某个 数据 传回call的时候，该页面进行重新加载
//      if (to.query.order_id && from.path === '/pay/union') {
////      if (to.query.order_id && from.path === '/moneyItem_info/pay/union') {
////      if (to.path === '/moneyItem_info/pay' && to.query.order_id) {
//        console.log('监听到order_id，进行定时查询订单信息')
//        this.orderType()
//      }
//    }
//  },
    created () {
//    if (this.$route.query.merchantOutOrderNo) { // 安卓上回到该页面会刷新，则判断url上是否有订单号这个参数
//      this.orderType()
//    } else {
        this.type = this.$route.query.type
        if (this.type) {
          this.top_header.title = '提前付款'
          this.data = {
            title: '应付金额',
            money: this.$route.query.remainAmount,
            item: [
              {
                title: '分期总额(元)',
                val: this.$route.query.amount
              }, {
                title: '剩余未付(元)',
                val: this.$route.query.remainAmount
              }
            ]
          }
        }
//    }
    },
    mounted () {
      this.radio_checked('MONEY_ITEM_INFO_PAY_radio_checked', 'checkValue', 0) // 传下标默认选中
    },
    destroyed () {
      clearInterval(this.inspect_timer)
    },
    methods: {
      goPay () {
        let flag = 'all' // 默认是提前还
        let money = parseFloat(this.$route.query.remainAmount)
        if (!this.type) { // 如果是当月还 则传当月15号 20180515
          money = parseFloat(this.$route.query.currentAmount)
          let _date = new Date()
          flag = _date.getFullYear() + '' + ((_date.getMonth() + 1) >= 10 ? (_date.getMonth() + 1) : '0' + (_date.getMonth() + 1)) + 15
        }
//      alert(this.iphone + '-' + money + '-' + flag)
        new M_Proms(fn => {
          let orderCreate = () => {
            this.AJAX({
              url: '/reimbursement/createOrder',
              data: {
  //            leaderPhone: this.$store.state.user.phone,
                leaderPhone: this.iphone,
                money: money, // 应付
  //            money: 1, // 测试的
                flag: flag
              },
              success: r => {
                this.order.data = r
//              location.hash = location.hash + '&merchantOutOrderNo=' + r.merchantOutOrderNo
                this.order.key = `?
                  merchantOutOrderNo=${r.merchantOutOrderNo}&
                  merid=${r.merid}&
                  noncestr=${r.noncestr}&
                  notifyUrl=${r.notifyUrl}&
                  orderMoney=${r.orderMoney}&
                  orderTime=${r.orderTime}&
                  sign=${r.sing}
                `.replace(/\s+/g,"")
                setTimeout(() => {
                  fn.then()
                }, 0)
              }
            })
          }
          if (this.checkValue === 0) { // 如果是支付宝的话
            jiexin.isAlipay('', val => {
              if (val == 1) {
                orderCreate()
              } else if (val == 0) { // 如果没装支付宝
                MessageBox.alert('您的手机未下载"支付宝"软件，请到应用市场上下载！', '温馨提示')
              }
            })
            return
          }
          orderCreate()
        }).then((fn) => {
          this.AJAX({
            url: '/api/createOrder', // 选择支付的方式
            data: this.order.key,
            success: res => {
              this.order.href = res
              fn.then()
            }
          })
        }).then(() => {
          if (this.checkValue !== 0) { // 除去第一种当前页跳转方式
//          debugger
//          isInstallAlipay
//          window.event.currentTarget.href = 'javascript:void(0)'
            this.AJAX({
              url: this.options[this.checkValue].url, // 选择支付的方式
              data: this.order.key,
              success: res => {
                // 直接当前页面跳转掉
                location.href = res
  //            this.$router.push({path: '/moneyItem_info/pay/union', query: {
  //              href: res,
  //              order_id: this.order.data.merchantOutOrderNo
  //            }})
              }
            })
          } else {
            this.orderType()
  //        M_visibilitychange(() => { // 对于支付宝这类，需监听后台转进页面的跳转 -- 纯页面才行，app嵌H5就不行
  //          this.orderType()
  //        })
  
            location.href = this.order.href
  
  //        this.order_href
  //        window.event.currentTarget.href = this.order.href
            // A标签的问题！！！！ 改成跳转试试
            
          }
        })
        
        
      },
      orderType () {
//      if (!this.$route.query.merchantOutOrderNo && is) {
//        return
//      }
        this.order_type = 'loading'
        this.top_header.title_style.color = 'white'
        this.top_header.title = '付款结果'
        this.top_header.left.icon = require('common/image/nav_btn_back.png')
        let ag = true // 是否执行下一次
        clearInterval(this.inspect_timer) // 先清空一次，防止堆叠
        this.inspect_timer = setInterval(() => {
          if (!ag) {
            return
          }
//        alert(this.order.data.merchantOutOrderNo)
          ag = false
          this.AJAX({
            url: '/reimbursement/querypaystatus',
            data: {
//            merchantOutOrderNo: this.$route.query.merchantOutOrderNo
              merchantOutOrderNo: this.order.data.merchantOutOrderNo
            },
            success: res => {
              ag = true
              if (res.payResult == 1) {
//              alert('true' + res)
                this.order_type = 'success'
                clearInterval(this.inspect_timer)
                jiexin.fireEvent('pay_updata', 'immediatePayment', true)
                return
              }
            }
          })
        }, 1000)
        
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
    .top_active {
      background: @background-header;
    }
    .row-content {
      background: #f5f6f7;
      .header {
        /*margin-top: .85rem;*/
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
        display: block;
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
    .iframe {
      position: fixed;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      padding-top: .87rem;
      box-sizing: border-box;
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  }
</style>