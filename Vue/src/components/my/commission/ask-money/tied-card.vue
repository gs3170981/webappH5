<template>
  <slide-page class="ASK_MONEY_TIED_CARD" :klass="'ASK_MONEY_TIED_CARD'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll ref="scroll" class="row-content"><!-- :data="record"-->
      <div style="padding-bottom: .9rem;">
        <p class="tips"><img class="icon" :src="other.icon"/>请绑定本人的银行卡</p>
        <div class="bank">开户银行<img class="icon" :src="other.icon1" alt="" /></div>
        <ul class="list">
          <li class="item" v-for="t in item">
            <label class="title" v-text="t.title"></label>
            <input :type="t.type" class="val" :value="t.val" :placeholder="t.pol" />
          </li>
        </ul>
        <p class="agreement"><img class="icon" :src="other.icon2"/>我已阅读并同意<span style="color: #4e99fd;"> 《xx协议》</span></p>
        <p class="submit" @click="submit_btn">提交</p>
      </div>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Scroll from 'base/scroll/scroll'
  export default {
    data () {
      return {
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/my_commission'
          },
          title: '绑卡',
          right: {
//          icon: require('common/image/nav_btn_help.png'),
//          href: ''
          }
        },
        item: [
          {
            title: '银行卡号',
            type: 'number',
            pol: '请输入银行卡号',
            val: ''
          }, {
            title: '持 卡 人',
            type: 'text',
            pol: '请输入持卡人姓名',
            val: ''
          }, {
            title: '手机号码',
            type: 'number',
            pol: '银行预留手机号码',
            val: ''
          }
        ],
        other: {
          icon: require('common/image/card_icon_tip.png'),
          icon1: require('common/image/det_btn_more.png'),
          icon2: require('common/image/card_icon_read_s.png')
        }
      }
    },
    components: {
      TopHeader,
      Scroll,
      SlidePage
    },
    created () {

    },
    methods: {
      submit_btn () {
        this.$router.push({path: '/my_commission/ask_money_tied_card/tied_result', query: {
          is: 'true',
        }})
      }
    }
  }
</script>

<style scoped lang="less">
  .ASK_MONEY_TIED_CARD {
    .header {
      background: @background-header;
    }
    .row-content {
      background: @color-hui1;
      .tips {
        margin-top: .9rem;
        display: flex;
        align-items: center;
        color: #979899;
        padding: 0 .25rem;
        height: .8rem;
        .icon {
          height: .36rem;
          margin-right: .2rem;
          width: .36rem;
        }
      }
      .bank {
        height: 1rem;
        background: white;
        font-size: @font-size-item_title;
        color: #626364;
        display: flex;
        padding: 0 .25rem;
        align-items: center;
        .icon {
          margin-left: auto;
          width: .14rem;
          height: .22rem;
        }
      }
      .list {
        background: white;
        font-size: @font-size-item_title;
        margin-top: .2rem;
        flex-direction: column;
        display: flex;
        padding: 0 .2rem;
        .item {
          display: flex;
          padding: 0 .05rem;
          align-items: center;
          border-bottom: .01rem solid #f2f4f5;
          height: 1rem;
          .title {
            width: 1.2rem;
          }
          .val {
            margin-left: .7rem;
            border: none;
            flex: 1;
            overflow: hidden;
            height: 100%;
            color: #626364;
            &::-webkit-input-placeholder {
              color: #cacbcc;
            }
            &::-moz-placeholder {
              color: #cacbcc;
            }
            &:-moz-placeholder {
              color: #cacbcc;
            }
            &:-ms-input-placeholder {
              color: #cacbcc;
            }
          }
        }
      }
      .agreement {
        height: .95rem;
        align-items: center;
        display: flex;
        color: #979899;
        padding: 0 .25rem;
        .icon {
          width: .3rem;
          height: .3rem;
          margin-right: .2rem;
        }
      }
      .submit {
        display: block;
        background: @background-header;
        color: white;
        width: 5rem;
        height: .84rem;
        border-radius: .5rem;
        box-shadow: 0px .1rem .16rem rgba(97, 172, 251, 0.4);
        margin: 3.5rem auto 1rem;
        text-align: center;
        line-height: .84rem;
        font-size: .34rem;
      }
    }
  }
  
</style>