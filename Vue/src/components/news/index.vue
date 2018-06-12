<template>
  <slide-page class="NEWS" :klass="'NEWS'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="top" :opt="top_header" @topHeader_seach="topSeach"></top-header>
    <ul class="header">
      <li class="item" :class="{ active: t.key == type }" :key="t.key" v-for="(t, i) in nav" @click="navClick(t.key)">
        <img class="icon" :src="t.icon" />
        <p class="title" v-text="t.title"></p>
        <span v-if="t.number" class="tips" v-text="t.number"></span>
      </li>
    </ul>
    <!--内容--><!-- :data="record"-->
    <scroll ref="scroll" class="row-content">
      <div style="padding-bottom: 2.6rem;">
        <banner class="row-slider-wrapper" :bounce="false" :momentumLimitDistance="50" :interval="0" ref="banner" :autoPlay="false" :loop="false" @touchEnd="touchEnd"><!--:dotsIndex="bannerIndexStyle"-->
          <ul v-for="(t, i) in nav" class="banner NEWS-banner">
            <!--业务消息-->
            <template v-if="t.url === 'API_newsBusiness'">
              <li class="item" v-for="(tt, ii) in t.list">
                <p class="title">
                  <img class="icon" :src="t[ii].icon"/>
                  <span class="new" v-if="tt.new"></span>
                  <!--<img class="icon" :src="t[tt.type].icon"/>-->
                  <!--<span class="name" v-text="t[tt.type].name"></span>-->
                  <span class="name">订单{{ t[ii].name }}</span>
                  <span class="timer" v-text="tt.timer"></span>
                </p>
                <p class="det" v-text="tt.det"></p>
                <p class="order">订单编号：{{ tt.order }}</p>
              </li>
            </template>
            <!--系统通知-->
            <template v-else-if="t.url === 'API_newsSys'">
              <li class="item" v-for="(tt, ii) in t.list">
                <p class="title">
                  <img class="icon" :src="t['0']"/>
                  <span class="name" v-text="tt.title"></span>
                  <span class="timer" v-text="tt.timer"></span>
                </p>
                <p class="det" style="padding-bottom: .2rem;" v-text="tt.det"></p>
              </li>
            </template>
            <!--平台活动-->
            <template v-else>
              <router-link v-for="(tt, ii) in t.list" :key="ii" tag="li" class="item" :to="'/news/act_det'">
                <p class="title">
                  <img class="icon" :src="t[tt.type]"/>
                  <span class="name" v-text="tt.title"></span>
                  <span class="btn">领取任务</span>
                </p>
                <img class="img" :src="tt.img" />
              </router-link>
              <!--<li class="item" v-for="(tt, ii) in t.list">
                <p class="title">
                  <img class="icon" :src="t[tt.type]"/>
                  <span class="name" v-text="tt.title"></span>
                  <span class="btn">领取任务</span>
                </p>
                <img class="img" :src="tt.img" alt="" />
              </li>-->
            </template>
            <li class="none" v-if="t.list.length == 0 && t.loading">
              <img class="icon" :src="other.icon" alt="" />
              <p class="tips">暂无通知</p>
            </li>
            <li v-else-if="!t.loading" class="loading fa fa-spinner fa-pulse"></li>
          </ul>
        </banner>
      </div>
    </scroll>
    <!--历史搜索条件界面-->
    <section v-show="seach.is" class="seach_his">
      <p class="title">
        <span class="name">历史搜索</span>
        <img class="icon" :src="seach.icon" alt="" />
      </p>
      <ul class="det">
        <li class="item" v-for="t in seach.item" v-text="t.title"></li>
      </ul>
    </section>
    <!--子滑动页面-->
    <router-view></router-view>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Banner from 'base/banner/banner'
  import Scroll from 'base/scroll/scroll'
  import { API_newsBusiness, API_newsAct, API_newsSys } from 'api/config.js'
  export default {
    data () {
      return {
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/'
          },
          title: '消息中心',
          right: {
            icon: require('common/image/nav_btn_search.png'),
//          href: '/',
            type: 'seach'
          }
        },
        seach: { // 搜索的历史界面展示
          is: false,
          icon: require('common/image/search_icon_delete.png'),
          item: [
            {
              title: '全部'
            }, {
              title: '臻商贷'
            }, {
              title: '安保分期联网报警'
            }, {
              title: '信用卡'
            }, {
              title: '活动奖励'
            }, {
              title: '提现'
            }
          ]
        },
        type: 0, // tab哪一个
        nav: [
          {
            url: 'API_newsBusiness',
            icon: require('common/image/msg_btn_business.png'),
            title: '业务消息',
            key: 0,
            number: 2,
            list: [],
            loading: false,
            is: false,
            '0': {
              icon: require('common/image/msg_icon_submit.png'),
              name: '已提交'
            },
            '1': {
              icon: require('common/image/msg_icon_reject.png'),
              name: '已辍回'
            },
            '2': {
              icon: require('common/image/msg_icon_veto.png'),
              name: '已否决'
            },
            '3': {
              icon: require('common/image/msg_icon_pass.png'),
              name: '已通过'
            },
            '4': {
              icon: require('common/image/msg_icon_write.png'),
              name: '已签约'
            },
            '5': {
              icon: require('common/image/msg_icon_money.png'),
              name: '已放款'
            },
            '6': {
              icon: require('common/image/msg_icon_stop.png'),
              name: '已终止'
            },
            '7': {
              icon: require('common/image/msg_icon_clear.png'),
              name: '已结清'
            },
            '8': {
              icon: require('common/image/msg_icon_overdue.png'),
              name: '已逾期'
            },
            '9': {
              icon: require('common/image/msg_icon_urge.png'),
              name: '已催回'
            },
            '10': {
              icon: require('common/image/msg_icon_replace.png'),
              name: '需代偿'
            },
            '11': {
              icon: require('common/image/msg_icon_repay.png'),
              name: '已代偿'
            }
          },
          {
            icon: require('common/image/msg_btn_system.png'),
            title: '系统通知',
            url: 'API_newsSys',
            list: [],
            '0': require('common/image/system_icon_notice.png'),
            key: 1,
            number: 0,
            loading: false,
            is: false
          },
          {
            icon: require('common/image/msg_btn_pc.png'),
            title: '平台活动',
            key: 2,
            '0': require('common/image/pc_icon_stages.png'),
            '1': require('common/image/pc_icon_loan.png'),
            url: 'API_newsAct',
            loading: false,
            list: [],
            number: 0,
            is: false
          }
        ],
        other: {
          icon: require('common/image/pay_img_default.png')
        }
      }
    },
    components: {
      TopHeader,
      Banner,
      Scroll,
      SlidePage
    },
//  watch: {
//    type (to, from) {
//      console.log(77, to)
////      this.$refs.banner._go(+to)
//    }
//  },
    created () {
//    this.getData(0, {}) // 0第几个
      
    },
    mounted () {
      setTimeout(() => {
//      this.$refs.banner._go(this.type)

        this.touchEnd(0, true)
      }, 20)
    },
    methods: {
      topSeach (show) {
        if (show === 'show') {
          this.seach.is = true
        } else if (show === 'enter') {
          
        } else { // hide
          this.seach.is = false
        }
      },
      getData (index, data, dom) {
        let obj = this.nav[index]
        if (index === 0) { // 瞎姬霸写 --- 等有接口后，规范AJAX，参照臻E盾
          API_newsBusiness(data, res => {
            obj.list = res
            obj.loading = true
            for (let i = 0; i < dom.length; i++) {
              dom[i].style.height = res.length * 3 + 'rem'
            }
            this.$refs.scroll.refresh()
          })
        } else if (index === 1) {
          API_newsSys(data, res => {
            obj.list = res
            obj.loading = true
          })
        } else {
          API_newsAct(data, res => {
            obj.list = res
            obj.loading = true
          })
        }
      },
      touchEnd (index, is) {
        if (!is && this.type == index) {
          return
        }
        this.type = index
        this.$refs.scroll.scrollTo(0, 0, 500)
        this.$refs.banner._go(index)
        console.log(index)
        
        let obj = this.nav[index]
        let dom = document.getElementsByClassName('NEWS-banner')
        for (let i = 0; i < dom.length; i++) {
          dom[i].style.height = '15rem'
        }
        this.$refs.scroll.refresh()
        
        if (obj.url) {
          this.getData(index, {}, dom)
        } else {
          obj.loading = true
        }
      },
      navClick (index) {
        this.touchEnd(index)
        this.type = index
      }
    }
  }
</script>

<style scoped lang="less">
  .NEWS {
    .top {
      background: @background-header;
    }
    .header {
      margin-top: .87rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.9rem;
      text-align: center;
      background: white;
      color: #18191a;
      .item {
        width: 33.3%;
        position: relative;
        transition: opacity .2s ease;
        opacity: .7;
        .icon {
          width: .92rem;
          height: .92rem;
        }
        .title {
          margin-top: .12rem;
        }
        .tips {
          background: #fd6d4b;
          border: .02rem solid white;
          height: .32rem;
          width: .32rem;
          line-height: .32rem;
          position: absolute;
          border-radius: 50%;
          font-size: .2rem;
          top: -.1rem;
          right: .7rem;
          color: white;
        }
      }
      .active {
        opacity: 1;
        .title {
          font-weight: bold;
        }
      }
    }
    .row-content {
      .banner {
        min-height: 15rem;
        padding: 0 .2rem;
        text-align: left;
        .item {
          background: white;
          padding: 0 .3rem;
          margin-top: .2rem;
          .title {
            display: flex;
            align-items: center;
            position: relative;
            border-bottom: .01rem solid #f2f4f5;
            height: .74rem;
            .icon {
              height: .36rem;
              margin-right: .2rem;
              width: .32rem;
            }
            .new {
              height: .1rem;
              width: .1rem;
              background: #fd6d4b;
              border-radius: 50%;
              top: .15rem;
              left: .27rem;
              position: absolute;
            }
            .name {
              font-weight: bold;
            }
            .timer {
              margin-left: auto;
              font-size: @font-size-item_det1;
              color: #b1b2b3;
            }
            .btn {
              margin-left: auto;
              font-size: .22rem;
              color: #ff765b;
              border: .01rem solid #ff765b;
              border-radius: .05rem;
              height: .42rem;
              line-height: .42rem;
              padding: 0 .1rem;
            }
          }
          .img {
            height: 3.1rem;
            width: 6.3rem;
            padding-bottom: .3rem;
          }
          .det {
            font-size: @font-size-smail;
            white-space: normal;
            line-height: .45rem;
            margin: .2rem 0;
            color: #626364;
          }
          .order {
            height: .7rem;
            border-top: .01rem solid #f2f4f5;
            line-height: .7rem;
            font-size: @font-size-smail;
            color: #979899;
          }
        }
        .none {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .icon {
            margin: 1rem 0 .5rem;
            height: 1.4rem;
            width: 2.24rem;
          }
          .tips {
            color: #B6B6B6;
          }
        }
        .loading {
          position: relative;
          top: 4rem;
          left: 3.2rem;
          color: #B6B6B6;
          font-size: .8rem;
        }
      }
      
    }
    .seach_his {
      height: 100%;
      background: white;
      width: 100%;
      position: fixed;
      margin-top: .87rem;
      box-sizing: border-box;
      padding: .1rem .3rem;
      top: 0;
      .title {
        height: .8rem;
        align-items: center;
        display: flex;
        .name {
          color: #979899;
        }
        .icon {
          height: .3rem;
          width: .28rem;
          margin-left: auto;
        }
      }
      .det {
        .item {
          
        }
      }
    }
  }
  
</style>