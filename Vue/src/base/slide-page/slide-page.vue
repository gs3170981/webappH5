<template>
  <transition name="slide">
    <!--<div ref="slideScroll">-->
      <div class="slide-page" ref="slideScroll">
        <div class="slide-page-swpier">
          <slot>
          </slot>
        </div>
      </div>
    <!--</div>-->
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
  export default {
    props: {
      href: {
        type: String,
        default: '/'
      },
      klass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    mounted () {
//    console.log(this.klass, this.href)
      if (!this.klass) {
        return
      }
      M_touchMove(this.klass, () => {
        this.$router.push({
          path: this.href
        })
      })
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
  .slide-page {
    /*-webkit-transition:-webkit-transform 0.3s linear;*/
    transition: all .2s ease;
    /*transition: all .1s ease;*/
    /*transition: all .3s ease;*/
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