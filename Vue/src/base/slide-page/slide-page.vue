<template>
  <transition name="slide">
    <div class="slide-page" :class="{ 'slide-page-active': slide }">
      <div class="slide-page-swpier">
        <slot>
        </slot>
      </div>
    </div>
  </transition>
</template>
<!--<template>
  <transition name="slide">
    <scroll class="slide-page" :id="id" :scrollX="true" :probeType="2" :scrollY="false" :listenScroll="true" @scroll="scroll">
      <div class="slide-page-swpier">
        <slot>
        </slot>
      </div>
    </scroll>
  </transition>
</template>-->

<script>
  import Scroll from 'base/scroll/scroll'
  import BScroll from 'better-scroll'
  import { M_touchMove } from 'common/js/methods.js'
  import { M_touchMove_pic } from 'common/js/methods.js'
  export default {
    props: {
      href: {
        type: String,
        default: '/'
      },
      klass: {
        type: String,
        default: ''
      },
      picDownTouchElId: {
        type: String,
        default: ''
      },
      picDownTouch: {
        type: Boolean,
        default: false
      },
      slidePage: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        slide: true
      }
    },
    mounted () {
//    console.log(this.klass, this.href)
      if (!this.klass) {
        return
      }
      if (this.slidePage) {
        M_touchMove(this.klass, () => {
          this.$router.push({
            path: this.href
          })
        })
      }
      // 暂不考虑图片太高去上下拖动的问题
      if (this.picDownTouch) {
        M_touchMove_pic(this.klass, this.picDownTouchElId, obj => {
          if (obj && obj.slide === false) {
            this.slide = false
          }
          setTimeout(() => {
            this.$router.push({
              path: this.href
            })
          }, 20)
        })
      }
    },
    methods: {

    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="less">
  /*.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }*/
  .slide-enter, .slide-leave-to {
    transform: translate(100%, 0) translateZ(0)!important;
    /*transform: translate3d(100%, 0, 0)!important;*/
  }
  .slide-page-active {
    transition: all .2s ease;
  }
  .slide-page {
    /*-webkit-transition:-webkit-transform 0.3s linear;*/
    /*transition: all .2s ease;*/
    /*transform: translate3d(0, 0, 0);*/ /*TODO 听说3d安卓上失效?*/
    transform: translate(0, 0) translateZ(0);
    z-index: 1;
    background: #f5f6f7;
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: hidden;
    top: 0;
    .slide-page-swpier {
      /*position: absolute;*/
      /*top: 0;*/
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      /*transform: translate(0, 0) translateZ(0);*/
    }
  }
</style>