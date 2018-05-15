<template>
  <section class="mask" v-show="show" :class="{ show: show }" @click="mask_show"></section>
</template>

<script>
  export default {
//  props: ['opt'],
    props: ['show'],
    data() {
      return {
      }
    },
    mounted () {
    },
    methods: {
      mask_show () {
        this.$emit('mask_show')
      }
    }
  }
</script>

<style scoped lang="less">
  .mask {
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity .3s ease;
    z-index: 0;
  }
  .show {
    opacity: 1;
  }
</style>