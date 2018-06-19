<template>
  <slide-page class="PROBLEM" :klass="'PROBLEM'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div style="padding-bottom: .9rem;">
        
        <header class="head">
          <p class="title">选择产品</p>
          <ul class="list">
            <li class="item" v-for="t in list" @click="radio_checked('PROBLEM_radio_checked', 'listValue', null, {img: 'radio'})">
              <span class="row-checkbox PROBLEM_radio_checked" style="border: 1px solid #589ffd;"></span>
              <span class="name" v-text="t.title"></span>
            </li>
          </ul>
        </header>
        <section class="qus">
          <p class="title">选择产品<span style="font-size: .26rem;color: #b1b2b3;"> （200字以内）</span></p>
          <p class="det">请详细描述您的问题或建议，我们将及时跟进解决。<br />（建议添加相关问题截图）</p>
          <ul class="pic">
            <li class="item">
              
            </li>
          </ul>
        </section>
      </div>
    </scroll>
  </slide-page>
</template>

<script>
  import TopHeader from 'base/top-header/top-header'
  import SlidePage from 'base/slide-page/slide-page'
  import Scroll from 'base/scroll/scroll'
  import { radio_checked } from 'common/js/mixins.js'
  export default {
    mixins: [radio_checked],
    data () {
      return {
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/'
          },
          title: '意见反馈',
          right: {
          }
        },
        listValue: 0,
        list: [
          {
            title: '臻分期',
            is: false
          }, {
            title: '臻商贷',
            is: false
          }, {
            title: '臻车贷',
            is: false
          }, {
            title: '信用卡',
            is: false
          }
        ]
      }
    },
    components: {
      TopHeader,
      Scroll,
      SlidePage
    },
    created () {
    },
    mounted () {
      this.radio_checked('PROBLEM_radio_checked', 'listValue', 0, {img: 'radio'})
    }
  }
</script>

<style scoped lang="less">
  .PROBLEM {
    background: @color-hui1;
    .header {
      background: @background-header;
    }
    .row-content {
      .head {
        background: white;
        padding: 0 .25rem .25rem;
        margin-top: .9rem;
        .title {
          height: .85rem;
          line-height: .85rem;
          font-size: @font-size-item_title;
          font-weight: bold;
        }
        .list {
          height: .6rem;
          align-items: center;
          justify-content: center;
          display: flex;
          .item {
            margin-right: .5rem;
            &:last-child {
              margin-right: 0;
            }
            .PROBLEM_radio_checked {
              height: .28rem;
              float: left;
              margin-right: .15rem;
              width: .28rem;
            }
            .name {
              
            }
          }
        }
      }
      .qus {
        background: white;
        margin-top: .2rem;
        padding: 0 .25rem .5rem;
        .title {
          height: .85rem;
          line-height: .85rem;
          font-size: @font-size-item_title;
          font-weight: bold;
        }
        .det {
          font-size: @font-size-item_det1;
          color: #cacbcc;
          height: .45rem;
          line-height: .45rem;
        }
        .pic {
          margin-top: 1.15rem;
          .item {
            margin-left: .25rem;
            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
      
    }
  }
  
</style>