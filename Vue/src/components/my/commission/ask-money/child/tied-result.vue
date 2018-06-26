<template>
  <slide-page class="ASK_MONEY_TIED_CARD_RESULT" :klass="'ASK_MONEY_TIED_CARD_RESULT'" :href="top_header.left.href">
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div style="padding-bottom: .9rem;">
        <order-type class="order" :type="order_type"></order-type>
      </div>
    </scroll>
  </slide-page>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import OrderType from 'base/order-type/order-type'
  export default {
    data () {
      return {
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/my_commission/ask_money_tied_card'
          },
          title: this.$route.query.is === 'true' ? '绑卡成功' : '绑卡失败',
          right: {
//          icon: require('common/image/nav_btn_help.png'),
//          href: '/my_commission/rule'
          }
        },
        order_type: this.$route.query.is
      }
    },
    components: {
      TopHeader,
      OrderType,
      Scroll,
      SlidePage
    },
    created () {
    }
  }
</script>

<style scoped lang="less">
  .ASK_MONEY_TIED_CARD_RESULT {
    .header {
      background: @background-header;
    }
    .row-content {
      background: white;
      .order {
        
      }
    }
    
  }
</style>