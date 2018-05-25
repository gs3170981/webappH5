<template>
  <slide-page class="more-det MY_COMMISSION_MORE_DET" :klass="'MY_COMMISSION_MORE_DET'" :href="top_header.left.href">
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
        item: [{
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
        }],
        timer: [{
          title: '入账时间',
          val: '2018-05-16 15:02'
        }, {
          title: '放款时间',
          val: '2018-04-24 15:02'
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
//    M_touchMove('MORE-DET', () => {
//      this.$router.push({
//        path: this.top_header.left.href
//      })
//    })

//    var timer = null;
//    var t_start;
//    let is = false
//    let throttle = function (fn, delay, mustDelay) {
//
//      var context = this,
//
//      args = arguments,
//      t_cur = +new Date();
//      clearTimeout(timer);
//      if (!t_start) {
//        t_start = t_cur;
//      }
//      if (t_cur - t_start >= mustDelay) {
//        fn.apply(context, args);
//        t_start = t_cur;
//      }
//      else {
//        timer = setTimeout(() => {
//          fn.apply(context, args);
//        }, delay);
//      }
//    }
//    
//    // TODO 有时间放到方法里调用
//    let obj = document.getElementsByClassName('MORE-DET')[0]
//    let touchmove = (event) => {
//      event = window.event || event
//      event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
//      // 一个手指
//      if (event.targetTouches.length == 1) {
//        throttle(() => {
//          var touch = event.targetTouches[0]
//          if (touch.pageX >= 0) {
//            obj.style.transform = "translate3d("+ touch.pageX +"px, 0, 0)"
//          }
//        }, 50, 100) // TODO 如果有性能问题，在这里微调
//      }
//    }
//    let touchstart = (event) => {
//      event = window.event || event
//      event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
//      var touch = event.targetTouches[0]
//      if (touch.pageX <= 20) { // TODO 到安卓后改为20,测试可调为100
//        is = true
//        obj.addEventListener('touchmove', touchmove, false)
//      }
//    }
//
//    obj.addEventListener("touchend", (event) => {
//      event = window.event || event
//      event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
//      if (!is) {
//        return
//      }
//      var touch = event.changedTouches[0]
//      let dom = window.getComputedStyle(obj, null)
//      if (touch.pageX < (parseInt(dom.width) / 2)) {
//        setTimeout(() => {
//          obj.style.transform = "translate3d(0, 0, 0)"
//        }, 100)
//      } else {
//        this.$router.push({
//          path: this.top_header.left.href
//        })
//      }
//      is = false
//      obj.removeEventListener("touchmove", touchmove)
//    }, false)
//    obj.addEventListener("touchstart", touchstart, false)
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