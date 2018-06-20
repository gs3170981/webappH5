<template>
  <slide-page class="PROBLEM_PIC" :klass="'PROBLEM_PIC'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <banner class="row-slider-wrapper banner" ref="banner" :autoPlay="false" :loop="false" :dot="false"><!--:dotsIndex="bannerIndexStyle"-->
      <div class="list" v-for="t in banner">
        <!--<a :href="t.linkUrl">-->
          <img class="needsclick item" :src="t.icon">
        <!--</a>-->
      </div>
    </banner>
  </slide-page>
</template>

<script>
  import TopHeader from 'base/top-header/top-header'
  import Banner from 'base/banner/banner'
  import SlidePage from 'base/slide-page/slide-page'
  export default {
    data () {
      return {
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/problem'
          },
          title: '',
          right: {
          }
        },
        banner: window._c_picList
      }
    },
    components: {
      TopHeader,
      Banner,
      SlidePage
    },
    created () {
    },
    mounted () {
      delete window._c_picList
      console.log(this.banner, window._c_picList)
    },
    methods: {
//    loadImage() {
//      if (!this.checkloaded) {
//        this.checkloaded = true
//        this.$refs.scroll.refresh()
//      }
//    },
    }
  }
</script>

<style scoped lang="less">
  .PROBLEM_PIC {
    background: black;
    .header {
      /*background: @background-header;*/
    }
    .banner {
      height: 100%;
      .list {
        height: 100%;
        margin-top: 2.7rem;
        .item {

        }
      }
    }
  }
</style>