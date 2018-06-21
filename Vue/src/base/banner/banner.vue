<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div v-if="dot" class="dots">
      <span class="dot" :style="dotsIndex" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
    <!--<div v-if="manual" class="manual-icon">-->
      <template v-if="manual">
        <i class="fa fa-caret-left" @click="_manualClick('left')"></i>
        <i class="fa fa-caret-right" @click="_manualClick('right')"></i>
      </template>
      
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      dot: {
        type: Boolean,
        default: true
      },
      dotsIndex: {
        type: Object,
        default: function () {
          return {
            background: 'white'
          }
        }
      },
      manual: { // icon事件增添手动触发滚动
        type: Boolean,
        default: false
      },
      autoPlay: { // 自动滚动
        type: Boolean,
        default: true
      },
      bounce: {
        type: Boolean,
        default: true
      },
      click: { // 是否派发点击事件
        type: Boolean,
        default: false
      },
      momentumLimitDistance: {
        type: Number,
        default: 15
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
//        freeScroll: true,
          momentum: false,
          snap: true,
          click: this.click,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          bindToWrapper: true, // 停止移动,自行拖拽
          snapSpeed: 400,
          momentumLimitDistance: this.momentumLimitDistance, // 最少移动的触摸距离才能滑动
          bounce: this.bounce // 是否开启回弹
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          this.$emit('touchEnd', pageIndex)
          if (this.autoPlay) {
            this._play()
          }
        })
        
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      },
      _go(page) {
        this.slider.goToPage(+page, 0, 400)
      },
      _manualClick (type) {
        let e = this.slider.getCurrentPage()
        console.log(e)
        clearTimeout(this.timer)
        let pageIndex = this.currentPageIndex + 1
        type === 'right' ? pageIndex ++ : pageIndex --
        setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        })
        setTimeout(() => {
          clearTimeout(this.timer)
          this._play()
        }, 2000) // 没设开关，所以多些延迟，防止滚动操作频繁
      },
      disable () {
        this.slider.disable && this.slider.disable()
      },
      enable () {
        this.slider.enable && this.slider.enable()
      }
    }
  }
</script>

<style scoped lang="less">
  /*@import "~common/stylus/variable"*/

  .slider{
    min-height: 1px;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        opacity: .5;
        /*background: rgba(255, 255, 255, 0.5);*/
      }
      .active {
        width: 20px;
        border-radius: 5px;
        /*background: rgba(255, 255, 255, 0.8);*/
        opacity: .8;
      }
    }
    /*.manual-icon {
      color: @color-yellow;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      font-size: .6rem;
      align-items: center;*/
      .fa-caret-left, .fa-caret-right {
        padding: .5rem;
        position: absolute;
        top: 10%;
        font-size: .6rem;
        color: @color-yellow;
      }
      .fa-caret-left {
        left: 0;
      }
      .fa-caret-right {
        right: 0;
      }
    /*}*/
    
  }



</style>