<template>
  <transition name="slide">
    <div class="slide-page">
      <slot>
      </slot>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="less">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .slide-page {
    z-index: 1;
    background: white;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
  }
</style>