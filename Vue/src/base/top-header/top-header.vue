<template>
  <header class="top-header">
    <!--左边-->
    <router-link 
      tag="i" 
      class="fa left-icon row-item" 
      :class="opt.left.icon" 
      :to="opt.left.href">
    </router-link>
    <!--title-->
    <h1 class="title" v-text="opt.title"></h1>
    <!--右边-->
    <router-link 
      tag="i" 
      class="fa right-icon row-item" 
      :class="opt.right.icon" 
      :to="opt.right.href" 
      @click.native="right">
    </router-link>
    <!--传参有列表的情况下-->
    <ul class="menu" v-if="opt.right.item" :class="{ active: item_show }">
      <router-link 
        tag="li" 
        class="item row-item" 
        v-for="t in opt.right.item" 
        :key="t.id" 
        @click.native="item_show = false" 
        :to="t.href">
        <i class="fa icon fa-fw" :class="t.icon"></i>{{ t.title }}
      </router-link>
      </li>
    </ul>
    <!--遮罩-->
    <mask-page :show="item_show" @mask_show="mask_show"></mask-page>
  </header>
</template>

<script>
  import MaskPage from 'base/mask/mask-page'
  export default {
//  props: ['opt'],
    props: ['opt'],
    data() {
      return {
        item_show: false
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
        if (this.opt.right.item) {
          this.item_show = true
        }
//      this.$emit('right')
      },
      mask_show () {
        this.item_show = false
      }
    }
  }
</script>

<style scoped lang="less">
  .top-header {
    height: .87rem;
    line-height: .87rem;
    position: fixed;
    width: 100%;
    z-index: 1;
    color: white;
    text-align: center;
    .title {
      position: fixed;
      width: 100%;
      z-index: -1;
      font-size: @font-size-header_title;
    }
    .left-icon, .right-icon {
        width: .4rem;
        height: .4rem;
        line-height: .4rem;
        padding: .25rem .2rem;
    }
    .left-icon {
        font-size: .7rem;
        float: left;
    }
    .right-icon {
        float: right;
        font-size: .4rem;
    }
    .menu {
      z-index: 2;
      position: absolute;
      right: .05rem;
      transform-origin: 90% top 0;
      transition: all .3s ease;
      transform: scale3d(0,0,1);
      text-align: left;
      top: .87rem;
      border-radius: .1rem;
      background: white;
      .item {
        padding-right: .7rem;
        height: .75rem;
        line-height: .75rem;
        color: black;
        border-bottom: .01rem solid #e6e6e6;
        .icon {
          color: @color-hui2;
          margin: 0 .25rem;
          font-size: @font-size-header_title;
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
</style>