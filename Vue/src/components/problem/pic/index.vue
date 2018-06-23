<template>
  <slide-page class="PROBLEM_PIC" :klass="'PROBLEM_PIC'" :slidePage="false" :picDownTouch="true" :picDownTouchElId="'PROBLEM_PIC-banner'" :href="top_header.left.href">
    <!--头部-->
    <top-header :class="{ hide: header_show }" class="header" :opt="top_header" @right="navRemove"></top-header>
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
  import { MessageBox } from 'mint-ui'
  import TopHeader from 'base/top-header/top-header'
  import Banner from 'base/banner/banner'
  import SlidePage from 'base/slide-page/slide-page'
  import MaskPage from 'base/mask/mask-page'
  import { $ } from 'common/js/methods.js'
  export default {
    data () {
      return {
        header_show: true,
        show: true,
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/problem'
          },
          title: '',
          right: {
            icon: require('common/image/nav_btn_delete.png'),
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
      // 清除全局传参
      delete window._c_picList
      this.top_header.title = (this.index + 1) + ' / ' + this.banner.length
      setTimeout(() => {
        // 显示当前页，避免滚动效果的展示
        $('PROBLEM_PIC-banner').children[0].style.transform = 'translate('+ - this.index * this.$refs.banner.slider.wrapperWidth +'px, 0px) translateZ(0px)'
        setTimeout(() => {
          this.$refs.banner._go(this.index)
        }, 100)
      }, 20)
    },
    methods: {
      navRemove () {
        MessageBox.confirm('要删除这张照片吗？').then(action => {
          if (this.index - 1 < 0) {
            this.banner.splice(this.index, 1)
            this.$router.push({path: '/problem'})
            return
          }
          let slider = this.$refs.banner.slider
          let slider_x = -(this.banner.length - 1) * slider.wrapperWidth
          
          this.$refs.banner._go(this.index - 1)
          this.banner.splice(this.index, 1)
          slider.maxScrollX = slider_x
          slider.startX = slider_x
          slider.absStartX = slider_x
        })
        
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
      opacity: 0;
    }
    .header {
      transition: all .4s ease;
      background: black;
      /*background: @background-header;*/
    }
    .banner {
      height: 100%;
      .list {
        height: 100%;
        /*margin-top: 2.7rem;*/
        .item {
          margin: auto;
          transition: all .2s ease;
        }
      }
    }
  }
</style>