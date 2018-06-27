<template>
  <section class="key-board" :class="{ 'key-board_active': show }">
    <ul class="number">
      <li class="item" v-for="t in numb" v-text="t.val"></li>
    </ul>
    <div class="close">
      <img class="icon" :src="icon"/>
    </div>
    <div class="close true-btn">确定</div>
  </section>
</template>

<script>
  export default {
//  props: ['type'],
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        icon: require('common/image/key_number_close.png'),
        numb: [
          {
            val: 1
          }, {
            val: 2
          }, {
            val: 3
          }, {
            val: 4
          }, {
            val: 5
          }, {
            val: 6
          }, {
            val: 7
          }, {
            val: 8
          }, {
            val: 9
          }, {
            val: '.'
          }, {
            val: 0
          }, {
            val: '清空'
          }
        ]
      }
    },
    components: {
    },
    created () {
    },
    methods: {
      
    }
  }
</script>

<style lang="less" scoped>
  .key-board {
    position: fixed;
    bottom: 0;
    height: 4.05rem;
    /*width: 100%;*/
    /*height: 100%;*/
    /*padding-top: .87rem;*/
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    z-index: -1;
    .number {
      float: left;
      height: 100%;
      width: 5.55rem;
      .item {
        float: left;
        display: flex;
        box-sizing: border-box;
        border-top: .02rem solid #e2e2e2;
        border-right: .02rem solid #e2e2e2;
        align-items: center;
        width: 33.333%;
        justify-content: center;
        font-size: .5rem;
        height: 25%;
        &:last-child {
          font-size: @font-size-big;
        }
      }
      
    }
    .close {
      overflow: hidden;
      height: 50%;
      display: flex;
      border-top: .02rem solid #e2e2e2;
      justify-content: center;
      align-items: center;
      .icon {
        height: .38rem;
        width: .52rem;
      }
    }
    .true-btn {
      font-size: @font-size-big;
      color: white;
      background: #4b8fdc;
    }
    
  }
  .key-board_active {
    z-index: 0;
  }
</style>