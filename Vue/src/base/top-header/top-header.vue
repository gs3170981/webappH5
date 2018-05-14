<template>
  <header class="top-header">
    <i class="fa left-icon" :class="opt.left_icon" @click="left"></i>
    <h1 class="title" v-text="opt.title"></h1>
    <i class="fa right-icon" :class="opt.right_icon" @click="right"></i>
  </header>
</template>

<script>
  export default {
//  props: ['opt'],
    props: ['opt'],
    data() {
      return {
//      opt: { // 参考传参
//        left_icon: 'fa-angle-left',
//        right_icon: 'fa-reorder',
//        title: 'Hello World!'
//      }
      }
    },
    mounted () {
      console.log(this.opt)
    },
    methods: {
      left () {
        this.$emit('left')
      },
      right () {
        this.$emit('right')
      }
    }
  }
</script>

<style scoped lang="less">
  .top-header {
    height: .87rem;
    line-height: .87rem;
    position: fixed;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    color: white;
    text-align: center;
    .title {
      position: fixed;
      width: 100%;
      z-index: -1;
      font-size: @font-size-header_title;
    }
    .left-icon, .right-icon {
        width: .4rem;
        height: .4rem;
        line-height: .4rem;
        padding: .25rem .2rem;
    }
    
    .left-icon {
        font-size: .7rem;
        float: left;

    }
    .right-icon {
        float: right;
        font-size: .4rem;
    }
  }
</style>