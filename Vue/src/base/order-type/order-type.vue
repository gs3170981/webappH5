<template>
  <section class="order-type" :class="{ 'order-type_active': type }">
    <div class="content">
      <template v-if="type === 'loading'">
        <img :src="loading.icon" class="icon" />
        <h1 class="title">付款处理中</h1>
        <p class="tips">已提交申请，等待付款处理</p>
      </template>
      <template v-else-if="type === 'success'">
        <img :src="success.icon" class="icon" />
        <h1 class="title">付款成功</h1>
        <p class="tips">￥{{ money }}<span style="margin-left: .15rem;"></span></p>
        <p class="btn" @click="ok()">完成</p>
      </template>
    </div>
  </section>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  export default {
//  props: ['type'],
    props: {
      type: [String, Boolean],
      money: String,
      iphone: String
    },
    data () {
      return {
        loading: {
          icon: require('common/image/card_img_wait.png')
        },
        success: {
          icon: require('common/image/card_img_success.png')
        }
      }
    },
    components: {
    },
    created () {
      console.log(this.money)
    },
    methods: {
      ok () {
//      const URL = location.protocol + 
//        '//' + 
//        location.host + 
//        location.pathname + 
//        '#/?mobile=' + this.iphone
//      location.href = URL
        jiexin.back()
        jiexin.fireEvent('pay_updata', 'immediatePayment', true)

//      jiexin.updateBackView('stageProduct')
//      this.$router.push({path: this.to, query: {call: true}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-type {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: .87rem;
    background: white;
    box-sizing: border-box;
    z-index: -1;
    .content {
      height: 6.85rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon {
        height: 1.8rem;
        width: 1.7rem;
        margin-bottom: .6rem;
      }
      .title {
        height: .56rem;
        font-size: @font-size-header_title;
        line-height: .56rem;
        color: #313233;
        font-weight: bold;
      }
      .tips {
        font-size: @font-size-item_title;
        color: #b1b2b3;
        height: .65rem;
        line-height: .65rem;
      }
      .btn {
        background: @background-header;
        width: 3.4rem;
        height: .84rem;
        line-height: .84rem;
        text-align: center;
        margin-top: .6rem;
        border-radius: .5rem;
        color: white;
        font-size: .34rem;
        box-shadow: 0 .1rem .16rem rgba(97, 172, 251, 0.4);
      }
    }
  }
  .order-type_active {
    z-index: 0;
  }
</style>