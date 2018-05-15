<template>
  <slide-page>
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>

  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  export default {
    data () {
      return {
        top_header: {
          left: {
            icon: 'fa-angle-left',
            href: '/my_commission'
          },
          title: '佣金规则',
          right: {
            icon: '',
            href: '',
          }
        }
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

<style>
</style>