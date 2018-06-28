<!--模板文件-->
<template>
  <slide-page class="ASK_MONEY_HISTORY" :klass="'ASK_MONEY_HISTORY'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div style="padding-bottom: .9rem;">
        
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
          title: '提现记录',
          right: {
            icon: require('common/image/nav_btn_calendar.png'),
            href: ''
          }
        }
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
      
    }
  }
</style>