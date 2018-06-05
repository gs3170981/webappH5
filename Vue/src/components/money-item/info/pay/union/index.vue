<template>
  <slide-page class="MONEY_ITEM_INFO_PAY_UNION" :klass="'MONEY_ITEM_INFO_PAY_UNION'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容--><!-- :data="record"-->
    <!--<scroll ref="scroll" class="row-content">-->
      <!--<div style="padding-bottom: .9rem;">-->
        <div class="warpper" style="">
          <!--<div style="height: 12rem;width: 100%;margin-top: .87rem;">123</div>-->
          <iframe id="iframe" :src="pay_href" class="ifame" marginheight="0" marginwidth="0" vspace="0" frameborder="0"></iframe>
        </div>
      <!--</div>-->
    <!--</scroll>-->
  </slide-page>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  export default {
    data () {
      return {
        pay_href: this.$route.query.href,
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back_black.png'),
            href: '/moneyItem_info/pay?order_id=' + this.$route.query.order_id
          },
          title: '银联支付',
          title_style: {
            color: 'black'
          },
          right: {
            icon: '',
            href: ''
          }
        }
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
  .MONEY_ITEM_INFO_PAY_UNION {
    /*background: @background-header!important;*/
    .top {
      background: white;
    }
    .warpper {
      position: absolute;
      top: .87rem;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      z-index: 1;
      -webkit-overflow-scrolling: touch;
      
      overflow-y: scroll;
      /*-webkit-overflow-scrolling: touch;*/
      /*-webkit-overflow-scrolling: auto;*/
      .ifame {
        /*transform: scale(.9);*/
        /*position: fixed;*/
        /*top: 0;*/
        min-height: calc(100% + 1px);
        width: 100%;
        /*overflow: hidden;*/
        /*overflow-y: auto;*/
        /*height: 120%;*/
        /*height: 100%;*/
        /*padding-top: .87rem;*/
        /*box-sizing: border-box;*/
      }
    }
    .row-content {
      /*height: 100%;*/
      
      
    }
  }
</style>