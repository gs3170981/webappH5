<!--因为有原生自带滑动，就不搞了-->
<template>
  <!--<transition name="slide">-->
    <!--<div ref="slideScroll">-->
      <!--<div class="slide-page" ref="slideScroll">-->
        <div class="slide-page-swpier">
          <slot>
          </slot>
        </div>
      <!--</div>-->
    <!--</div>-->
  <!--</transition>-->
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
//import BScroll from 'better-scroll'
//import { M_touchMove } from 'common/js/methods.js'
//export default {
//  props: {
//    href: {
//      type: String,
//      default: '/'
//    },
//    klass: {
//      type: String,
//      default: ''
//    }
//  },
//  data() {
//    return {
//    }
//  },
//  mounted () {
////    console.log(this.klass, this.href)
//    if (!this.klass) {
//      return
//    }
//    M_touchMove(this.klass, () => {
//      this.$router.push({
//        path: this.href
//      })
//    })
//  },
//  methods: {
//
//  }
//}
</script>

<style scoped lang="less">
  /*.slide-enter, .slide-leave-to {
    transform: translate(100%, 0) translateZ(0)!important;
  }
  .slide-page {
    transition: all .2s ease;
    transform: translate(0, 0) translateZ(0);
    z-index: 1;
    background: #f5f6f7;
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: hidden;
    top: 0;
    .slide-page-swpier {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
    }
  }*/
  .slide-page-swpier {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
    }
</style>