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
  export default {
    props: ['id'],
    data() {
      return {
      }
    },
    mounted () {
//    setTimeout(() => {
//      let el = document.getElementsByClassName('slide-page')
//      debugger
////      transform: translate(0, 0) translateZ(0);
//    }, 200)
//    console.log(this.id)
//    setTimeout(() => {
//      this._initScroll()
//    }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.slideScroll) {
          return
        }
        this.slideS = new BScroll(this.$refs.slideScroll, {
          scrollX: false,
          scrollY: false,
          probeType: 2,
          momentum: false, // ？
//        stopPropagation: true
          
        })
        this.slideS.on('scroll', (pos) => {
          console.log(this.slideS.distX)
//        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
//          this.$emit('scrollToEnd')
//        }
        })
        
      },
      scroll (pos) {
        console.log(pos)
      }
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
    /*transform: translate3d(100%, 0, 0);*/
  }
  .slide-page {
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
    /*transform: translate(0, 0) translateZ(0);*/
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