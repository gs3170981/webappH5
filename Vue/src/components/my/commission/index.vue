<template>
  <slide-page class="MY_COMMISSION" :klass="'MY_COMMISSION'" :href="top_header.left.href">
    <!--头部-->
    <top-header :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll" :probeType="2" :listenScroll="true" @scroll="_scroll"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
      <div>
        <!--头部背景-->
        <img class="header" :src="header_img" />
        <!--悬浮的模块-->
        <section class="content-float row-padding">
          <h1 class="title">佣金概览<router-link tag="span" class="more" to="/my_commission/more">查看更多<img class="row-icon-right" :src="icon.right" /></router-link></h1>
          <div id="chart"></div>
          <router-link tag="img" class="ask_money" :src="icon.money" to="/my_commission/ask_money"></router-link>
        </section>
        <!--中间的内容模块-->
        <section class="content row-padding row-border-bottom">
          <h1 class="title">任务佣金<router-link tag="span" class="more" to="/my_commission/task">历史任务<img class="row-icon-right" :src="icon.right" /></router-link></h1>
          <!--TODO 在子页面时，banner的定时器未清空,仍在执行,有时间改改-->
          <banner v-if="banner.length" class="row-slider-wrapper" :dotsIndex="bannerIndexStyle"><!--:manual="true" -->
            <!--有时间加个传参，去变化滚动的css样式-->
            <div v-for="t in banner" class="banner" :key="t.id">
              <template v-if="t.type === 'false'">
                <p class="title" style="margin-top: .2rem;"><i class="fa icon" :class="t.icon"></i>{{ t.title }}</p>
                <div v-if="t.type === 'false'" style="margin-top: .2rem;" class="row-btn" @click="getTask()">领任务</div>
              </template>
              
              <template v-else-if="t.type === 'loading'">
                <p class="title"><i class="fa icon" :class="t.icon"></i>{{ t.title }}</p>
                <p class="timer">{{ t.timer }}</p>
                <div class="btn loading row-btn">进行中</div>
              </template>
              
            </div>
          </banner>
        </section>
        <!--底部内容模块-->
        <footer class="footer row-padding">
          <h1 class="title">产品佣金</h1>
          <ul class="det">
            <li class="item" v-for="t in footer_data">
              <span v-text="t.title"></span>
              <router-link tag="span" class="more row-item" to="/my_commission/rule">详见《佣金规则》</router-link>
              <!--<span class="more">详见《佣金规则》</span>-->
            </li>
          </ul>
        </footer>
        
        <!--底部-->
        <bottom-footer></bottom-footer>
      </div>
    </scroll>
    <!--弹出的任务模板-->
    <mask-page :show="mask.is">
      <div class="mask-content">
        <dl class="content" :style="mask.style">
          <dt class="det" v-text="mask.det"></dt>
          <dd class="row-btn row-item" @click="getTask(true)">领任务</dd>
          <dd class="close" @click="mask.is = false">x</dd>
        </dl>
      </div>
    </mask-page>
    <!--子滑动页面-->
    <router-view></router-view>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page'
  import TopHeader from 'base/top-header/top-header'
  import Banner from 'base/banner/banner'
  import Scroll from 'base/scroll/scroll'
  import MaskPage from 'base/mask/mask-page'
  import BottomFooter from 'base/bottom-footer/bottom-footer'
  import { $ } from 'common/js/methods.js'
  export default {
    data () {
      return {
        icon: {
          right: require('common/image/det_btn_more.png'),
          money: require('common/image/comm_icon_cash.png')
        },
        footer_data: [
          {
            id: 'a',
            title: '臻商贷推广'
          }, {
            id: 'b',
            title: '臻车贷推广'
          }, {
            id: 'c',
            title: '信用卡推广'
          }
        ],
        mask: {
          is: false,
          style: {
            background: "url(" + require('common/image/comm_pop_img_prize.png') + ")top center",
            backgroundSize: '100% 100%'
          },
          money: 1000,
//        title: '',
          det: '任务领取后xx天内，累计完成xx单【放款】联网报警服务费分期业务【分期金额不限】即可获得任务奖励，任务奖励可到佣金记录查看。任务有效期内未完成规有奖励，请知悉！定任务，则没有奖励，请知悉！'
        },
        header_img: require('common/image/commission-header.png'),
        top_header: {
          left: {
            icon: require('common/image/nav_btn_back.png'),
            href: '/'
          },
          title: '我的佣金',
          right: {
            icon: require('common/image/nav_btn_help.png'),
            href: '/my_commission/rule'
          }
        },
        banner: [
          {
            icon: 'fa-share-square-o',
            type: 'false',
            id: 'a',
            title: '臻分期推广'
          }, {
            icon: 'fa-share-square-o',
            type: 'loading',
            timer: '2018年5月2日到期',
            id: 'b',
            title: '完善个人资料'
          }
        ],
        bannerIndexStyle: {
          background: '#f56f55'
        },
        /* TODO 这边要看后台的数据结构,再做相应的数据抽离整改*/
        chartData: [
          {
            name: '已提佣金',
            val: 3000
          }, {
            name: '冻结佣金',
            val: 1000
          }, {
            name: '可提佣金',
            val: 5000
          }
        ],
        option: {
          tooltip: {
            trigger: 'item',
//          formatter: "{a} <br/>{b}: {c} ({d}%)",
            formatter: "{b}: <br/>{c} ({d}%)",
            position: (pos, params, dom, rect, size) => {
              let obj = {}
//            x = pos[0] y = pos[1] y顶点左上，x顶点左下（pos为点击的坐标）
//            pos[0] > size.viewSize[0] / 2 为x轴大于中间（size.viewSize为大小）
//            console.log(pos[0], size.viewSize[0] / 2)
              let lr = pos[0] > size.viewSize[0] / 2
              let ud = pos[1] > size.viewSize[1] / 2
              if (!lr && !ud) { // 上左
                obj = {
                  top: 0,
                  left: 0
                }
              } else if (lr && !ud) { // 上右
                obj = {
                  top: 0,
                  right: 0
                }
              } else if (lr && ud) { // 下右
                obj = {
                  bottom: 80,
                  right: 0
                }
              } else if (!lr && ud) { // 下左
                obj = {
                  bottom: 80,
                  left: 0
                }
              }
              return obj
            }
          },
          legend: {
            orient: 'horizontal',
            x: 'center',
            y: '70%',
            formatter: (name) => {
              let chartData = this.chartData
              for (let i = 0; i < chartData.length; i++) {
                if (chartData[i].name === name) {
                  return  [
                    ` {title|${name}}`,
                    `￥{money|${chartData[i].val}}　`,
                  ].join('\n')
                }
              }
            },
            textStyle: {
              lineHeight: 17,
              rich: {
                title: {
                  color: '#bfbfbf'
                },
                money: {
                  fontSize: 15,
                }
              }
            },
            data: [
              {
                name: '已提佣金',
                icon: 'circle'
              }, {
                name: '冻结佣金',
                icon: 'circle'
              }, {
                name: '可提佣金',
                icon: 'circle'
              }
            ]
          },
          color:['#38d7ff','#8871d5','#4694fc'],
          title: {
            text: '总资产',
            subtext: '￥8000',
            textStyle: {
              color: '#bcbdbe',
              fontSize: '13',
              height: '5px'
            },
            subtextStyle: {
              color: '#303132',
              fontSize: '16',
            },
            x: 'center',
            y: '23%'
          },
          series: [
            {
              name:'佣金概述',
              type:'pie',
              radius: ['40%', '60%'],
              center: ['center', '35%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '19',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {
                  value: 3000,
                  name: '已提佣金',
                  label: {
                    show: false
                  }
                }, {
                  value: 1000,
                  name: '冻结佣金',
                  label: {
                    show: false
                  }
                }, {
                  value: 5000,
                  name: '可提佣金',
                  label: {
                    show: false
                  }
                }
              ]
            }
          ]
        }
      }
    },
    components: {
      TopHeader,
      Scroll,
      Banner,
      SlidePage,
      MaskPage,
      BottomFooter
    },
    created () {
    },
    mounted () {
      let myChart = this.echarts.init($('chart'))
      myChart.setOption(this.option)
    },
    methods: {
      getTask (is) {
        /*AJAX*/
        if (is) {
          /*领取成功!*/
          this.mask.is = false
        } else {
          this.mask.is = true
        }
      },
      maskClose () {
        this.mask.is = false
      },
      _scroll (e) {
//      e = window.getComputedStyle(e.wrapper, null)
        let e_style = e.wrapper.children[0].style
        let trasf = e_style.transform
        trasf = parseInt(trasf.substring(trasf.indexOf(',') + 1, trasf.indexOf(')')))
        if (trasf <= 0 && trasf >= -100) {
          console.log(1)
          let header = e.wrapper.parentNode.getElementsByTagName('header')[0]
          let bg = window.getComputedStyle(header, null).background
          let val = Math.abs(trasf) / 100
          header.style.background = 'linear-gradient(90deg, rgba(63, 141, 247, '+ val +') 0%, rgba(72, 184, 255, '+ val +') 100%)'
          // TODO 之后看看能不能用除了js控制的方式实现，还有想办法抽离，不能每个地方都写这
          // 手势滑动 会有颜色的问题
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .row-content {
    
    .header {
      height: 3.3rem;
      width: 100%;
    }
    .content-float {
      position: absolute;
      height: 5rem;
      width: 6.9rem;
      box-sizing: border-box;
      border-radius: .15rem;
      box-shadow: 0 .2rem .45rem 0 #e9eff7;
      left: .3rem;
      top: 2.4rem;
      z-index: 1;
      background: white;
      .title {
        font-size: @font-size-item_title;
        height: .4rem;
        font-weight: bold;
        line-height: .4rem;
        .more {
          color: @color-hui;
          float: right;
        }
      }
      #chart {
        height: 100%;
        /*line-height: 2.9rem;*/
      }
      .ask_money {
        position: absolute;
        width: .4rem;
        height: .36rem;
        padding: .1rem;
        right: .3rem;
        bottom: .4rem;
      }
    }
    .content {
      background: white;
      padding-top: 4.5rem;
      .title {
        font-size: @font-size-item_title;
        height: .4rem;
        margin: .05rem 0;
        font-weight: bold;
        line-height: .4rem;
        .more {
          color: @color-hui;
          float: right;
        }
      }
      .banner {
        height: 2.4rem;
        text-align: center;
        .title {
          height: .65rem;
          font-weight: 400;
          font-size: @font-size-item_title;
          line-height: .65rem;
          .icon { /* 这个颜色应该也是后台配置的 */
            color: #2ee5a7;
            font-size: .45rem;
            position: relative;
            top: .07rem;
            margin-right: .2rem;
          }
        }
        .timer {
          margin-bottom: .2rem;
          color: @color-org;
        }
        .row-btn {
          background: @background-org-btn;
          box-shadow: 0 .1rem .16rem 0 rgba(252, 173, 103, 0.4);
        }
        .loading {
          opacity: .5;
        }
      }
    }
    .footer {
      background: white;
      .title {
        font-size: @font-size-item_title;
        height: .6rem;
        font-weight: bold;
        line-height: .6rem;
        padding-bottom: .2rem;
        border-bottom: .01rem solid #f5f6f7;
      }
      .det {
        .item {
          height: .8rem;
          overflow: hidden;
          line-height: .8rem;
          border-bottom: .01rem solid #f5f6f7;
          &:last-child {
            border-bottom: none;
          }
          .more {
            float: right;
            font-size: @font-size-item_det1;
            color: @color-blue;
          }
        }
      }
    }
  }
  .mask-content {
    display: flex;
    align-items: center;
    height: 90%;
    justify-content: center;
    .content {
      width: 7.2rem;
      height: 8rem;
      .det {
        box-sizing: border-box;
        padding: 4.05rem 1.06rem .3rem;
        line-height: .48rem;
        color: @color-org1;
        font-size: @font-size-item_det1;
      }
      .row-btn {
        width: 3rem;
        height: .68rem;
        background: @background-org-btn;
        box-shadow: 0 .1rem .16rem 0 rgba(252, 173, 103, 0.4);
      }
      .close {
        height: .7rem;
        width: .7rem;
        border-radius: 50%;
        border: .02rem solid white;
        font-weight: bold;
        text-align: center;
        line-height: .65rem;
        margin: 1rem auto 0;
        font-size: @font-size-header_title;
        color: white;
      }
    }
  }
</style>