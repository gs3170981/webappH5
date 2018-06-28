<template>
  <section class="key-board" :class="{ 'key-board_active': show }">
    <ul class="number">
      <li class="item" v-for="t in numb" v-text="t.val" @click="put(t.val)"></li>
      <li class="item" @click="clear">清空</li>
    </ul>
    <div class="close">
      <img class="icon" :src="icon" @click="back" />
    </div>
    <div class="close true-btn" @click="success">确定</div>
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
        money: '',
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
          }
        ]
      }
    },
    components: {
    },
    created () {
    },
    methods: {
      put (val) {
        this.money += val
        this.$emit('val', this.money)
      },
      clear () {
        this.money = ''
        this.$emit('val', '', 'all')
      },
      success () {
        this.$emit('end')
      },
      back () {
        this.money = this.money.substring(0, this.money.length - 1)
        this.$emit('val', this.money)
      }
    }
  }
</script>

<style lang="less" scoped>
  .key-board {
    opacity: 0;
    transform: translate(0%, 100%);
    position: fixed;
    transition: all .2s ease;
    bottom: 0;
    height: 4.05rem;
    background: #f5f6f7;
    /*width: 100%;*/
    /*height: 100%;*/
    /*padding-top: .87rem;*/
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    /*z-index: -1;*/
    .number {
      float: left;
      height: 100%;
      width: 5.551rem;
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
    /*z-index: 0;*/
    transform: translate(0%, 0%);
    opacity: 1;
  }
</style>