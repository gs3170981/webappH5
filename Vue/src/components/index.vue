<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="items"><!--:data=xxx监听数据变化，节点自动计算然后可上下滚动-->
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <banner>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <!--如果fastclick延迟点击与自身click冲突，则加needsclick样式，进行冒泡-->
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </banner>
        </div>
        <ul>
          <li style="line-height: 55px;" v-for="item in items" v-text="item" @click="test()"></li>
        </ul>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { api_banner } from 'api/config.js'
  import Banner from 'base/banner/banner'
  import Scroll from 'base/scroll/scroll'
  export default {
    data () {
      return {
        items: [1,2,3,4,5,6,7,8,9,10,11,12,13],
        recommends: []
      }
    },
    components: {
      Banner,
      Scroll
    },
    created () {
      api_banner({
        val: 123
      }, r => {
        this.recommends = r.data.slider
      })

//    this.items = [1,2,3,4,5,6,7,8,9,10,11,12,13]

    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      test () {
        this.$router.push({
          path: '/chartAnalysis'
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  .recommend {
    position: fixed;
    width: 100%;
    top: 0; /*什么破设定，没就错*/
    bottom: 0; /*什么破设定，没就错*/
  }
  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }.recommend-content {
    height: 100%;
    overflow: hidden;
  }
</style>
