<template>
  <slide-page class="NEWS_ACT_DET" :klass="'NEWS_ACT_DET'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <!--TODO 有bug，高度计算有误，暂时先这样使用-->
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
            href: '/news'
          },
          title: '活动详情',
          right: {
            icon: '',
            href: '',
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
  .NEWS_ACT_DET {
    background: white;
    .header {
      background: @background-header;
    }
    .row-content {
      /*margin: .9rem .3rem .78rem;*/
    }
  }
  
</style>