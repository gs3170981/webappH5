<template>
  <slide-page class="PROBLEM" :klass="'PROBLEM'" :href="top_header.left.href">
    <!--头部-->
    <top-header class="header" :opt="top_header"></top-header>
    <!--内容-->
    <scroll class="row-content" ref="scroll" :data="pic"><!-- :data="items"监听会变动的数据，节点自动计算然后可上下滚动-->
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
          <textarea v-model="det" class="input" placeholder="请详细描述您的问题或建议，我们将及时跟进解决。       （建议添加相关问题截图）"></textarea>
          <ul class="pic">
            <li @click="picShow" class="item" v-for="(t, i) in pic" v-show="pic.length" :style="{ marginRight: (i + 1) % 4 === 0 ? 0 : '.25rem' }">
              <img class="icon" :src="t.icon"/>
            </li>
            <li class="item">
              <input class="file" type="file" name="" id="" value="" @change="picChange" />
              <img class="icon" :src="picPlus_icon" />
            </li>
          </ul>
        </section>
        <dl class="iphone">
          <dt class="title">联系方式</dt>
          <dd class="det">
            <input v-model="iphone" class="input" type="text" placeholder="请输入您的手机号，方便我们及时向您沟通解决问题" name="" id="" value="" />
          </dd>
        </dl>
        <p class="btn row-btn">提交</p>
      </div>
    </scroll>
    <!--子滑动页面-->
    <router-view></router-view>
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
        ],
        pic: [],
        det: '',
        picPlus_icon: require('common/image/suggest_icon_add.png'),
        iphone: ''
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
    },
    methods: {
      picChange (e) {
        e = e.target
        if (e.files.length === 0) {
//        $('#myIDphoto')[0].src = ''
          return
        }
        let reader = new FileReader()
        reader.onload = (res) => {
          this.pic.push({
            icon: res.target.result
          })
//        $('#myIDphoto')[0].src = e.target.result
        }
        reader.readAsDataURL(e.files[0])
      },
      picShow () {
        window._c_picList = this.pic
        this.$router.push({path: '/problem/pic'})
      }
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
        .input {
          height: 1.85rem;
          display: block;
          font-size: @font-size-item_det1;
          width: 100%;
          font-family: "微软雅黑";
          border: none;
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
        .det {
          font-size: @font-size-item_det1;
          color: #cacbcc;
          height: .45rem;
          line-height: .45rem;
        }
        .pic {
          overflow: hidden;
          margin-top: .25rem;
          .item {
            height: 1.56rem;
            width: 1.56rem;
            float: left;
            margin-bottom: .25rem;
            position: relative;
            .file {
              position: absolute;
              top: 0;
              height: 100%;
              z-index: 1;
              opacity: 0;
              width: 100%;
            }
            .icon {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .iphone {
        background: white;
        margin-top: .2rem;
        padding: 0 .25rem .23rem;
        .title {
          height: .85rem;
          line-height: .85rem;
          font-size: @font-size-item_title;
          font-weight: bold;
        }
        .det {
          height: .6rem;
          line-height: .6rem;
          .input {
            height: 100%;
            display: block;
            font-size: @font-size-item_det1;
            width: 100%;
            border: none;
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
      .btn {
        margin: 1.1rem auto;
        background: @background-header;
        height: .84rem;
        line-height: .84rem;
        font-size: .34rem;
        width: 5rem;
        box-shadow: 0 .1rem .16rem rgba(97, 172, 251, 0.4);
      }
    }
  }
  
</style>