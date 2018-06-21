<template>
  <slide-page class="PROBLEM_PIC" :klass="'PROBLEM_PIC'" :href="top_header.left.href">
    <!--头部-->
    <top-header :class="{ hide: header_show }" class="header" :opt="top_header"></top-header>
    <!--内容-->
    <banner id="PROBLEM_PIC-banner" class="row-slider-wrapper banner" :click='true' ref="banner" @touchEnd="touchEnd" :autoPlay="false" :loop="false" :dot="false"><!--:dotsIndex="bannerIndexStyle"-->
      <div class="list" v-for="t in banner" @click="header_show = !header_show">
        <!--<a :href="t.linkUrl">-->
          
          <img class="needsclick item" :src="t.icon" :style="t.style">
        <!--</a>-->
      </div>
    </banner>
    <!--遮罩-->
    <!--<mask-page :show="show" style="background: black;"></mask-page>-->
  </slide-page>
</template>

<script>
  import TopHeader from 'base/top-header/top-header'
  import Banner from 'base/banner/banner'
  import SlidePage from 'base/slide-page/slide-page'
  import MaskPage from 'base/mask/mask-page'
  import { $ } from 'common/js/methods.js'
  export default {
    data () {
      return {
        header_show: false,
        show: true,
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/problem'
          },
          title: '',
          right: {
          }
        },
        banner: window._c_picList,
        index: this.$route.query.index
      }
    },
    computed: {
//    pic_style () {
//      console.log(123)
//    }
    },
    components: {
      TopHeader,
      Banner,
      MaskPage,
      SlidePage
    },
    created () {
    },
    mounted () {
      console.log(window._c_picList)
      delete window._c_picList
      this.top_header.title = (this.index + 1) + ' / ' + this.banner.length
      setTimeout(() => {
//      console.log($('PROBLEM_PIC-banner').children)
        $('PROBLEM_PIC-banner').children[0].style.transform = 'translate('+ - this.index * this.$refs.banner.slider.wrapperWidth +'px, 0px) translateZ(0px)'
        setTimeout(() => {
          this.$refs.banner._go(this.index)
        }, 500)
//      this.$refs.banner.currentPageIndex = this.index
//      console.log(this.$refs.banner.slider.wrapperWidth)
//      setTimeout(() => {
//        this.show = false
//      }, 550)
      }, 20)
    },
    methods: {
      asd () {
        alert()
      },
      touchEnd (index) {
//      alert(JSON.stringify(this.banner[index].style))
        this.index = index
        this.top_header.title = (this.index + 1) + ' / ' + this.banner.length
      }
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
    .hide {
      transform: translate(0, -100%) translateZ(0);
    }
    .header {
      transition: all .35s ease;
      /*background: @background-header;*/
    }
    .banner {
      height: 100%;
      .list {
        height: 100%;
        /*margin-top: 2.7rem;*/
        .item {
          margin: auto;
        }
      }
    }
  }
</style>