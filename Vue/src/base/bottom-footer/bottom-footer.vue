<template>
  <footer class="bottom-footer">
    <h1 class="name">
      <span class="line">——</span>　中标金服　<span class="line">——</span>
    </h1>
    <p class="tips">杭州中标金融服务外包有限公司仅提供借贷申请通道</p>
  </footer>
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
  .bottom-footer {
    padding: .3rem 0;
    text-align: center;
    color: #cacbcc;
    .name {
      font-size: @font-size-item_title;
      font-weight: bold;
      height: .4rem;
      line-height: .4rem;
      .line {
        font-size: @font-size-item_det1;
        color: #e2e2e2;
      }
    }
    .tips {
      height: .3rem;
      line-height: .3rem;
      margin-top: .1rem;
      font-size: @font-size-smail;
    }
  }
</style>