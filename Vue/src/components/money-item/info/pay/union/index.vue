<template>
  <slide-page class="MONEY_ITEM_INFO_PAY_UNION" :klass="'MONEY_ITEM_INFO_PAY_UNION'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header"></top-header>
    <!--内容-->
    <iframe :src="pay_href" class="row-content" marginheight="0" marginwidth="0"  frameborder="0"></iframe>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  export default {
    data () {
      return {
        pay_href: this.$route.query.href,
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back_black.png'),
            href: '/moneyItem_info/pay'
          },
          title: '银联支付',
          title_style: {
            color: 'black'
          },
          right: {
            icon: '',
            href: ''
          }
        },
      }
    },
    components: {
      TopHeader,
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
    .row-content {
      position: fixed;
      top: 0;
      width: 100%;
      overflow: hidden;
      overflow-y: auto;
      height: 100%;
      padding-top: .87rem;
      box-sizing: border-box;
    }
  }
</style>