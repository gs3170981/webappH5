<template>
  <div class="Top">
    <header class="top-header">
      <!--左边-->
      <router-link 
        tag="img" 
        class="left-icon row-item" 
        :src="opt.left.icon" 
        v-show="!seach.show" 
        :to="opt.left.href">
      </router-link>
      <!--title-->
      <h1 class="title" :style="opt.title_style" v-text="opt.title"></h1>
      <!--右边-->
      <router-link 
        v-if="opt.right.icon" 
        tag="img" 
        class="right-icon row-item" 
        :src="opt.right.icon" 
        :to="href" 
        @click.native="right">
      </router-link>
      <!--传参有type==='seach'的情况下-->
      <!--<template v-if="opt.right.type && opt.right.type === 'seach'">-->
        <form class="seach-form" v-if="opt.right.type && opt.right.type === 'seach'" action='' onsubmit="return false;">
          <div class="seach" :class="{ seach_active: seach.show }">
            <input id="input" placeholder="搜索" class="input" type="search" @keydown="seach_keydown" />
            <img class="icon" :src="seach.icon" />
          </div>
          <span v-show="seach.show" class="close-btn" @click="seach_close">取消</span>
        </form>
      <!--</template>-->
      
      <!--传参有item列表的情况下-->
      <ul class="menu" v-if="opt.right.item" :class="{ active: item_show }">
        <router-link 
          tag="li" 
          class="item row-item" 
          v-for="t in opt.right.item" 
          :key="t.id" 
          @click.native="item_show = false" 
          :to="t.href">
          <img class="icon" :src="t.icon" />{{ t.title }}
        </router-link>
        </li>
      </ul>
      <!--遮罩-->
      <mask-page :show="item_show" @mask_show="mask_show"></mask-page>
    </header>
    <div class="top-header_gra"></div>
  </div>
</template>

<script>
  import MaskPage from 'base/mask/mask-page'
  import { $ } from 'common/js/methods.js'
  export default {
//  props: ['opt'],
    props: ['opt'],
    data() {
      return {
        item_show: false,
        seach: {
          icon: require('common/image/search_icon_se.png'),
          show: false
        }
      }
    },
    computed: {
      href () {
        return this.opt.right.href ? this.opt.right.href : ''
      }
    },
    mounted () {
    },
    components: {
      MaskPage
    },
    methods: {
      left () {
//      this.$emit('left')
      },
      right () {
        let right = this.opt.right
        if (right.item) { // 如果筛选多的，再搞对象执行
          this.item_show = true
        } else if (right.type) {
          if (right.type === 'seach') {
            this.seach.show = true
            $("input").focus()
            this.$emit('topHeader_seach', 'show')
          }
        }
//      this.$emit('right')
      },
      seach_keydown (e) {
        if (event.keyCode == "13") {
          this.$emit('topHeader_seach', 'enter')
        }
      },
      mask_show () {
        this.item_show = false
      },
      seach_close () {
        this.seach.show = false
        $("input").value = ''
        this.$emit('topHeader_seach', 'hide')
      }
    }
  }
</script>

<style scoped lang="less">
  .Top {
    height: .87rem;
    line-height: .87rem;
    width: 100%;
    position: fixed;
    z-index: 1;
    .top-header_gra {
      transition: opacity .6s ease;
      background: @background-header;
      width: 100%;
      position: absolute;
      z-index: 0;
      height: 100%;
      opacity: 0;
      top: 0;
    }
    .top-header {
      height: 100%;
      position: relative;
      width: 100%;
      z-index: 1;
      display: flex;
      align-items: center;
      color: white;
      text-align: center;
      .title {
        position: absolute;
        width: 100%;
        z-index: -1;
        font-size: @font-size-header_title;
      }
      .left-icon, .right-icon {
          width: .4rem;
          height: .4rem;
          line-height: .4rem;
          padding: 0 .2rem;
      }
      .left-icon {
          /*font-size: .7rem;*/
      }
      .right-icon {
          margin-left: auto;
          /*font-size: .4rem;*/
      }
      .seach_active {
        transform: scale3d(1, 1, 1)!important;
        opacity: 1!important;
      }
      .seach-form {
        display: flex;
        align-items: center;
        .seach {
          transition: all .3s ease;
          transform: scale3d(0, 1, 1);
          transform-origin: 100% 50% 0;
          height: .56rem;
          width: 6rem;
          border-radius: .3rem;
          right: 1.2rem;
          background: white;
          opacity: 0;
          display: flex;
          align-items: center;
          padding: 0 .65rem;
          box-sizing: border-box;
          position: absolute;
          .icon {
            height: .32rem;
            position: absolute;
            left: .2rem;
            width: .32rem;
          }
          .input {
            height: 100%;
            display: block;
            color: #696969;
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
        .close-btn {
          color: white;
          font-size: .32rem;
          padding: 0 .3rem;
        }
      }
      .menu {
        z-index: 2;
        position: absolute;
        right: .1rem;
        transform-origin: 90% top 0;
        transition: all .3s ease;
        transform: scale3d(0,0,1);
        text-align: left;
        top: .87rem;
        border-radius: .1rem;
        background: white;
        .item {
          padding: 0 .35rem 0 .3rem;
          height: .85rem;
          display: flex;
          align-items: center;
          line-height: .85rem;
          color: black;
          font-size: @font-size-item_title;
          border-bottom: .01rem solid #e6e6e6;
          .icon {
            color: @color-hui2;
            height: .36rem;
            width: .36rem;
            margin-right: .25rem;
          }
          &:last-child {
            border-bottom: none;
          }
        }
        &:after {
          content: '';
          position: absolute;
          top: -.05rem;
          right: .15rem;
          height: .4rem;
          width: .5rem;
          background: white;
          transform: rotate(-45deg);
          z-index: -1;
        }
      }
      .active {
        transform:scale3d(1,1,1)
      }
    }
  }
</style>