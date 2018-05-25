<template>
  <slide-page class="rule MY_COMMISSION_RULE" :klass="'MY_COMMISSION_RULE'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <!--TODO 有bug，高度计算有误，暂时先这样使用-->
      <div style="padding-bottom: 1.7rem;">
        <img class="content-title" :src="product.path" />
        <!--臻分期-->
        <dl class="block row-padding">
          <dt class="title">
            <img class="icon" :src="product.stages.path" />
            <span class="tips" v-text="product.stages.title"></span>
          </dt>
          <dd class="det" v-text="product.stages.det"></dd>
          <img class="other-img" style="left: .65rem;" :src="other_path" />
          <img class="other-img" style="right: .65rem;" :src="other_path" />
        </dl>
        <!--臻商贷-->
        <dl class="block row-padding">
          <dt class="title">
            <img class="icon" :src="product.shop.path" />
            <span class="tips" v-text="product.shop.title"></span>
          </dt>
          <dd class="item" v-for="t in product.shop.item">
            <h6 class="item-title" v-text="t.title"></h6>
            <p class="item-det" v-text="t.det"></p>
          </dd>
          <img class="other-img" style="left: .65rem;" :src="other_path" />
          <img class="other-img" style="right: .65rem;" :src="other_path" />
        </dl>
        <!--臻车贷-->
        <dl class="block row-padding">
          <dt class="title">
            <img class="icon" :src="product.car.path" />
            <span class="tips" v-text="product.car.title"></span>
          </dt>
          <dd class="det" v-text="product.car.det"></dd>
          <img class="other-img" style="left: .65rem;" :src="other_path" />
          <img class="other-img" style="right: .65rem;" :src="other_path" />
        </dl>
        <!--臻车贷-->
        <dl class="block row-padding">
          <dt class="title">
            <img class="icon" :src="product.card.path" />
            <span class="tips" v-text="product.card.title"></span>
          </dt>
          <dd class="det" v-text="product.card.det"></dd>
        </dl>
      </div>
    </scroll>
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
          title: '佣金规则',
          right: {
            icon: '',
            href: '',
          }
        },
        other_path: require('common/image/rule_icon_link.png'),
        product: {
          path: require('common/image/rule_img_title01.png'),
          stages: {
            path: require('common/image/home_icon_stages.png'),
            title: '臻分期',
            det: '臻分期产品本身不设置佣金，但可领取任务赚取佣金，具体佣金可到我的佣金-任务佣金或者臻分期首页广告活动栏领取任务查看。'
          },
          shop: {
            path: require('common/image/home_icon_loan.png'),
            title: '臻商贷',
            item: [
              {
                title: '佣金计算方式：',
                det: '臻商贷佣金=贷款金额×1.5%×30%，比如成功借款10万元，您可获得佣金=100000×1.5%×30%=450元，无客户贷款期限无关；'
              }, {
                title: '佣金发放方式：',
                det: '借款在当月15号（含）前发放的，当月先结算所得佣金的40%，借款在当月15号后发放的，则在次月15号结算所得佣金的40%，剩余60%佣金在客户还清借款后一次性发放，如借款结清日在当月15号（含）之前，则佣金在当月15号发放，如在15号以后结清则在次月15号结算。每月15号为佣金统一结算日，如遇节假日，则顺延至下一个工作日，请知悉！'
              }
            ]
          },
          car: {
            title: '臻车贷',
            path: require('common/image/home_icon_car.png'),
            det: '没有商量好，具体分配比例'
          },
          card: {
            path: require('common/image/home_icon_card.png'),
            title: '信用卡',
            det: '没有商量好，具体分配比例'
          }
        },
        task: {
          path: require('common/image/rule_img_title02.png'),
          det: '指各产品的限时推广活动奖励，该项佣金是针对领取任务，并在任务有效期内，完成所有任务指标业务员的一种额外激励、奖励与产品本身的佣金不冲突。'
        }
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

<style lang="less" scoped>
  .rule {
    background: @background-header;
    .header {
      background: @background-header;
    }
    .row-content {
      margin: .9rem .3rem .78rem;
      /*margin: 90px 30px 78px;*/
      /*padding: .9rem .3rem .78rem;*/
      .content-title {
        width: 3.7rem;
        height: .66rem;
        margin: .25rem auto .3rem;
        display: block;
      }
      .block {
        padding-bottom: .35rem;
        border-radius: .1rem;
        margin-bottom: .2rem;
        position: relative;
        background: white;
        .title {
          height: .54rem;
          line-height: .54rem;
          .icon {
            width: .58rem;
            float: left;
            height: .54rem;
            margin-right: .2rem;
          }
          .tips {
            font-weight: bold;
            overflow: hidden;
            font-size: @font-size-item_title;
          }
        }
        .item {
          .item-title {
            height: .55rem;
            color: @color-org;
            font-size: @font-size-item_det1;
            margin-top: .15rem;
            line-height: .55rem;
          }
          .item-det {
            line-height: .45rem;
            font-size: @font-size-item_det1;
            color: @color-hui2;
          }
        }
        .det {
          margin-top: .15rem;
          line-height: .42rem;
          font-size: @font-size-item_det1;
          color: @color-hui2;
        }
        .other-img {
          position: absolute;
          height: .6rem;
          width: .14rem;
          margin: .15rem;
          z-index: 1;
        }
      }
    }
  }
  
</style>