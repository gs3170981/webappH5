<template>
  <slide-page class="ABOUT" :klass="'ABOUT'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div style="padding-bottom: .9rem;">
        <header class="head">
          <h1 class="title">臻信通</h1>
          <p class="version">V 1.0</p>
        </header>
        <ul class="list">
        	<li v-for="t in list" class="item">
        	  <span class="name" v-text="t.name"></span>
        	  <span class="val">
        	    {{ t.val }}
        	   <img class="right-icon" :src="other.right_icon" />
        	  </span>
        	</li>
        </ul>
        <p class="tips">臻信通系列产品</p>
        <ul class="footer">
          <li class="item" v-for="t in pro">
            <img class="icon" :src="t.icon" />
            <div style="margin-left: .25rem;">
              <h3 class="title" v-text="t.title"></h3>
              <p class="det" v-text="t.det"></p>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </slide-page>
</template>

<script>
  import TopHeader from 'base/top-header/top-header'
  import SlidePage from 'base/slide-page/slide-page'
  import Scroll from 'base/scroll/scroll'
  export default {
    data () {
      return {
        other: {
          right_icon: require('common/image/det_btn_more.png')
        },
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/'
          },
          title: '关于我们',
          right: {
          }
        },
        list: [
          {
            name: '官方网址',
            val: 'www.51puhui.cn'
          }, {
            name: '官方客服',
            val: '4000185050'
          }, {
            name: '微信订阅号',
            val: '臻信通咨询'
          }, {
            name: '微信服务号',
            val: '臻信通'
          }
        ],
        pro: [
          {
            title: '臻分期',
            icon: require('common/image/home_icon_stages.png'),
            det: '先使用后付费'
          }, {
            title: '臻商贷',
            icon: require('common/image/home_icon_loan.png'),
            det: '低利率高额度'
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
    }
  }
</script>

<style scoped lang="less">
  .ABOUT {
    background: @color-hui1;
    .header {
      background: @background-header;
    }
    .row-content {
      .head {
        margin-top: .9rem;
        height: 2.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .title {
          font-size: .6rem;
          margin-bottom: .3rem;
          color: #4aaef5;
          font-weight: bold;
        }
        .version {
          color: #B1B2B3;
        }
      }
      .list {
        background: white;
        padding: 0 .3rem;
        .item {
          height: 1rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f2f4f5;
          &:last-child {
            border-bottom: none;
          }
          .name {
            
          }
          .val {
            color: #B1B2B3;
            margin-left: auto;
            .right-icon {
              margin-left: .1rem;
              height: .22rem;
              width: .14rem;
            }
          }
          
        }
      }
      .tips {
        color: #979899;
        height: .85rem;
        line-height: .85rem;
        padding: 0 .3rem;
      }
      .footer {
        padding-left: .3rem;
        .item {
          float: left;
          margin-right: .25rem;
          border-radius: .1rem;
          background: white;
          height: 1.4rem;
          display: flex;
          align-items: center;
          width: 3.32rem;
          .icon {
            margin-left: .25rem;
            height: .64rem;
            width: .68rem;
          }
          .title {
            font-size: .34rem;
          }
          .det {
            font-size: .26rem;
            margin-top: .15rem;
            color: #979899;
          }
        }
      }
    }
  }
  
</style>