<template>
  <slide-page class="MONEY_ITEM_INFO_PAY" :klass="'MONEY_ITEM_INFO_PAY'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header" :class="{ top_active: order_type }"></top-header>
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
            <span class="row-checkbox MONEY_ITEM_INFO_PAY_radio_checked"></span>
          </li>
        </ul>
        <div style="position: relative;">
          <p v-if="type" class="tips">
            <img class="icon" :src="icon.err" />
            <span class="title">提前付款是指针对所有未出账单付款，不能提前支付部分账单，提前付款无任何手续费！</span>
          </p>
        </div>
        <!--<p class="pay-btn row-item" @click="goPay()">去付款</p>-->
        <a class="pay-btn row-item" :href="order_href" @click="goPay">去付款</a>
      </div>
      <order-type :type="order_type" :money="data.money" :to="'/moneyItem_info'"></order-type>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Scroll from 'base/scroll/scroll'
  import OrderType from 'base/order-type/order-type'
  import { radio_checked } from 'common/js/mixins.js'
  import { M_Proms, M_visibilitychange } from 'common/js/methods.js'
  
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
        icon: {
          err: require('common/image/pay_icon_tip.png')
        },
        inspect_timer: '',
        options: [
          {
            url: '/api/createOrder', // 支付宝
            icon: require('common/image/pay_logo_alipay.png')
          }, {
            url: '/api/createQuickOrder', // 银联
            icon: require('common/image/pay_logo_union.png')
          }
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
      OrderType,
      SlidePage
    },
    watch: {
     '$route' (to, from) { // 监听到 某个 数据 传回call的时候，该页面进行重新加载
        if (to.query.order_id && from.path === '/moneyItem_info/pay/union') {
//      if (to.path === '/moneyItem_info/pay' && to.query.order_id) {
          console.log('监听到order_id，进行定时查询订单信息')
          this.orderType()
        }
      }
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
      this.orderCreate() // 订单创建
    },
    mounted () {
//    this.orderType()
//    if (this.$route.query.order_id) {
//      return
//    }
      this.radio_checked('MONEY_ITEM_INFO_PAY_radio_checked', 'checkValue', 0) // 传下标默认选中
    },
    destroyed () {
      clearInterval(this.inspect_timer)
    },
    methods: {
      orderCreate () { // 创建订单
        let flag = 'all' // 默认是提前还
        let money = parseFloat(this.$store.state.pay.remainAmount)
        if (!this.type) { // 如果是当月还 则传当月15号 20180515
          money = parseFloat(this.$store.state.pay.currentAmount)
          let _date = new Date()
          flag = _date.getFullYear() + '' + ((_date.getMonth() + 1) >= 10 ? (_date.getMonth() + 1) : '0' + (_date.getMonth() + 1)) + 15
        }
        new M_Proms(fn => {
          this.AJAX({
            url: '/reimbursement/createOrder',
            data: {
              leaderPhone: this.$store.state.user.phone,
  //          money: money, // 应付
              money: 1,
              flag: flag
            },
            success: r => {
              this.order.data = r
              this.order.key = `?
                merchantOutOrderNo=${r.merchantOutOrderNo}&
                merid=${r.merid}&
                noncestr=${r.noncestr}&
                notifyUrl=${r.notifyUrl}&
                orderMoney=${r.orderMoney}&
                orderTime=${r.orderTime}&
                sign=${r.sing}
              `.replace(/\s+/g,"")
              
              fn.then()
            }
          })
        }).then((fn) => {
          
          this.AJAX({
            url: '/api/createOrder', // 选择支付的方式
            data: this.order.key,
            success: res => {
              this.order.href = res
            }
          })
        })
      },
      goPay () {
        if (this.checkValue !== 0) { // 除去第一种当前页跳转方式
//        this.order_href = 'javascript:void(0)'
          window.event.currentTarget.href = 'javascript:void(0)'
          this.AJAX({
            url: this.options[this.checkValue].url, // 选择支付的方式
            data: this.order.key,
            success: res => {
              this.$router.push({path: '/moneyItem_info/pay/union', query: {
                href: res,
                order_id: this.order.data.merchantOutOrderNo
              }})
            }
          })
        } else {
//        alert(this.order.data.merchantOutOrderNo)
          window.event.currentTarget.href = this.order.href
//        const fn = () => {
//          this.AJAX({
//            url: '/reimbursement/querypaystatus',
//            data: {
//              merchantOutOrderNo: this.order.data.merchantOutOrderNo
//            },
//            success: res => {
//              fn()
//            }
//          })
//        }
//        fn()
          
          
          M_visibilitychange(() => { // 对于支付宝这类，需监听后台转进页面的跳转
//          setTimeout(() => {
//            this.$router.replace('/moneyItem_info/pay?order_id=' + this.order.data.merchantOutOrderNo)
//          }, 20)
//          location.reload()
            this.orderType()
            
          })
        }
        
//      setTimeout(() => {
//        
//      }, 1000)
        
        
        
//      let flag = 'all' // 默认是提前还
//      let money = parseFloat(this.$store.state.pay.remainAmount)
//      if (!this.type) { // 如果是当月还 则传当月15号 20180515
//        money = parseFloat(this.$store.state.pay.currentAmount)
//        let _date = new Date()
//        flag = _date.getFullYear() + '' + ((_date.getMonth() + 1) >= 10 ? (_date.getMonth() + 1) : '0' + (_date.getMonth() + 1)) + 15
//      }


//      console.log(flag, money, this.$store.state.user.phone)
//      new M_Proms(fn => { // 创建订单
//        this.AJAX({
//          url: '/reimbursement/createOrder',
//          data: {
//            leaderPhone: this.$store.state.user.phone,
////          money: money, // 应付
//            money: 1,
//            flag: flag
//          },
//          success: res => {
//            fn.then(res)
//          }
//        })
//      }).then((fn, r) => { // 调用支付宝 || 聚合支付API
//        console.log(r)
//        let key = `?
//          merchantOutOrderNo=${r.merchantOutOrderNo}&
//          merid=${r.merid}&
//          noncestr=${r.noncestr}&
//          notifyUrl=${r.notifyUrl}&
//          orderMoney=${r.orderMoney}&
//          orderTime=${r.orderTime}&
//          sign=${r.sing}
//        `.replace(/\s+/g,"")
//        this.AJAX({
//          url: this.options[this.checkValue].url, // 选择支付的方式
//          data: key,
//          success: res => {
//            console.log(res)
//            alert(res)
////            debugger
//            if (this.checkValue === 0) { // 支付宝
//              window.location.assign("alipay://platformapi/startApp?appId=10000011&url=https%3A%2F%2Falipay.3c-buy.com%2Fapi%2FcreateOrder%3FmerchantOutOrderNo%3D20180531182130%26merid%3Dyft2017082500005%26noncestr%3Djiexinanbao%26notifyUrl%3Dhttp%3A%2F%2F39.108.15.199%3A8061%2Freimbursement%2Fcallback.json%26orderMoney%3D1.00%26orderTime%3D20180531182130%26sign%3D980194107b044cb792964fb7f23466b6")
//            } else {
//              this.$router.push({path: '/moneyItem_info/pay/union', query: {href: res}})
//            }
//
////            fn.then({
////              data: res,
////              order: r.merchantOutOrderNo
////            })
//          }
//        })
//      }).then((fn, r) => { // 定时查询接口
////        alert(r.order)
//        setTimeout(() => {
//          this.order_type = 'loading'
//          this.top_header.title_style.color = 'white'
//          this.top_header.title = '付款结果'
//          this.top_header.left.icon = require('common/image/nav_btn_back.png')
//        }, 1000)
//        let timer_is = true // 定时器开关，如果请求不到，则禁止请求下一次，导致请求堆叠
//        let test = 0
//        M_visibilitychange(() => {
////          setTimeout(() => {
//          this.$router.push({path: '/moneyItem_info/type', query: {order_id: r.order}})
////            this.AJAX({
////              url: '/reimbursement/querypaystatus',
////              data: {
////                merchantOutOrderNo: r.order
////              },
////              success: res => {
////                timer_is = true
////                document.getElementById('app').innerText = JSON.stringify(location)
////              }
////            })
////          }, 5000)
//        })
//        let _timer = new Date().getTime()
//        let is = false
//        setInterval(() => {
////          while (!is) {
////            if ((new Date().getTime() - _timer) > 10000) {
//              document.getElementById('app').innerText = test
////              return
////            }
////
//          test++
////            
////          }
//        }, 5000)
          
          
//        this.timer = setInterval(() => {
////            document.getElementById('app').innerText = r.order
////          if (!timer_is) return
////          timer_is = false
//          this.AJAX({
//            url: '/reimbursement/querypaystatus',
//            data: {
//              merchantOutOrderNo: r.order
//            },
//            success: res => {
//              timer_is = true
//              document.getElementById('app').innerText = res
////              test++
////              document.write(timer_is)
//              console.log(res)
////              if (!res) { // 返回失败的话
////                document.getElementById('app').innerText = res
////                clearInterval(this.timer)
////                return
////              }
////              if (res.payResult === '1') {
////                this.order_type = 'success'
////                clearInterval(this.timer)
////              }
//            }
//          })
//        }, 5000)
//      })
//      this.$router.push({path: '/moneyItem_info', query: {call: true}})
//      this.$store.commit('increment')
      },
      orderType () {
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
          ag = false
          this.AJAX({
            url: '/reimbursement/querypaystatus',
            data: {
              merchantOutOrderNo: this.order.data.merchantOutOrderNo
            },
            success: res => {
              ag = true
              if (res.payResult == 1) {
//              alert('true' + res)
                this.order_type = 'success'
                clearInterval(this.inspect_timer)
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
  }
</style>