<template>
  <section class="mask" :class="{ show: show }" @click="mask_show">
    <slot>
    </slot>
  </section>
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
    visibility: hidden;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity .3s ease;
    z-index: 0;
    top: 0;
  }
  .show {
    visibility: visible;
    opacity: 1;
  }
</style>