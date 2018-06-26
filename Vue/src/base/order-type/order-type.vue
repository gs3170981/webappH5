<template>
  <section class="order-type" :class="{ 'order-type_active': type }">
    <div class="content">
      <template v-if="type === 'false'">
        <img :src="False.icon" class="icon" />
        <h1 class="title">绑卡失败</h1>
        <p class="tips">姓名与身份证不一致</p>
        <p class="btn" @click="again">重新绑卡</p>
        <p class="btn" style="background: transparent;color: #4e99fd;box-shadow: none;border: .01rem solid #4697f7;" @click="back">返回首页</p>
      </template>
      <template v-else>
        <img :src="Success.icon" class="icon" />
        <h1 class="title">绑卡成功</h1>
        <p class="btn" @click="ok">去提现</p>
      </template>
    </div>
  </section>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  export default {
//  props: ['type'],
    props: {
      type: {
        type: String,
        default: 'false'
      }
    },
    data () {
      return {
        False: {
          icon: require('common/image/card_img_fail.png')
        },
        Success: {
          icon: require('common/image/card_img_success.png')
        }
      }
    },
    components: {
    },
    created () {
    },
    methods: {
      again () {
        
      },
      back () {
        
      },
      ok () {
        this.$router.push({
          path: '/my_commission/ask_money'
        })
//      const URL = location.protocol + 
//        '//' + 
//        location.host + 
//        location.pathname + 
//        '#/?mobile=' + this.iphone
//      location.href = URL
//      jiexin.back()

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
      height: 10rem;
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