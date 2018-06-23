const D = document

const M_Touch = () => {
  /*TODO 对于未出现的dom元素,没法进行事件代理,查找方法*/
  setTimeout(r => {
    let item = D.getElementsByClassName("row-item")
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener('touchstart', e => {
        for (let j = 0; j < item.length; j++) {
          item[j].style.opacity = 1
        }
        e.currentTarget.style.opacity = .5
      })
      item[i].addEventListener('touchend', e => {
        e.currentTarget.style.opacity = 1
      })
    }
  }, 20)
}
// 测试例子 e 为 父级对象，val为e对象下的key，res.amount为当前的val值
// M_NumberPlusReduce({
//   e: this.header,
//   val: 'money' // this.header.money = 1000
// }, res.amount) // 1500
const M_NumberPlusReduce = (obj, now) => { // 数据自增自减，针对2位小数
  if (Object.prototype.toString.call(obj)=='[object Array]') { // 支持for json
    for (let i = 0; i < obj.length; i++) {
      M_NumberPlusReduce(obj[i], obj[i].now)
    }
    return
  }
  // now 是ajax值
//if (!parseInt(now)) return
  let val = parseInt(obj.e[obj.val])
  if (!val) val = 0
  let _now = parseFloat(now).toFixed(2)
  let now_smail = _now.substring(_now.lastIndexOf('.'), _now.length)
  now = parseInt(now)
  const small_comp = (v, n) => {
    let timer = setInterval(r => {
      if (v == n) {
        clearInterval(timer)
        obj.e[obj.val] = parseFloat(v) + now_smail
        return
      }
      v > n ? v-- : v++
      obj.e[obj.val] = parseFloat(v) + now_smail
    }, 0)
  }
  let f_number = 1
  let sum = now
  let is = false
  let diff_val = 50 // 差值在多少以内，进行随机时间执行
  let diff_max_val = 100 // 差值太大的时候，执行的固定次数
  let i = 0
  if (val > now) { // 减
    if ((val - sum) > diff_val) {
      f_number = parseInt(((val - sum) - diff_val) / diff_max_val)
      if (f_number) {
        sum += diff_val
        is = true
      } else {
        f_number = 1
      }
    }
    if (is) {
      let timer = setInterval(r => {
        if (i === diff_max_val) {
          clearInterval(timer)
          small_comp(val, now)
          return
        }
        val -= f_number
        i++
        obj.e[obj.val] = parseFloat(val) + now_smail
      }, Math.random() * 10)
    } else {
      small_comp(val, sum)
    }
  } else { // 加
    if ((sum - val) > diff_val) {
      f_number = parseInt(((sum - val) - diff_val) / diff_max_val)
      if (f_number) {
        sum -= diff_val
        is = true
      } else {
        f_number = 1
      }
    }
    if (is) {
      let timer = setInterval(r => {
        if (i === diff_max_val) {
          clearInterval(timer)
          small_comp(val, now)
          return
        }
        val += f_number
        i++
        obj.e[obj.val] = parseFloat(val) + now_smail
      },  Math.random() * 10)
    } else {
      small_comp(val, sum)
    }
  }
}
const $ = (dom) => {
  return D.getElementById(dom)
}
// 相当于JQ find class
const M_findClass = (el, klass) => {
  let child = el.children
  for (let i = 0; i < child.length; i++) {
    let klass_arr = child[i].classList
    let is = false
    for (let j = 0; j < klass_arr.length; j++) {
      if (klass_arr[j] === klass) {
        return child[i]
      }
    }
    if (!is) {
      if (child[i].children[0]) {
        return M_findClass(child[i], klass)
      }
    }
  }
}
// 例子 M_decimal(res, ['amount', 'remainAmount', 'currentAmount', 'nextMonthAmount'])
const M_decimal = (obj, arr) => { // 传入多个对象，返回2位小数
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = (obj[arr[i]] ? obj[arr[i]] : 0).toFixed(2)
  }
}

const M_touchMove = (klass, call) => {
  let obj = D.getElementsByClassName(klass)[0]
  if (!obj) {
    return
  }
  let timer = null
  let t_start
  let is = false
  const throttle = function (fn, delay, mustDelay) {
    let context = this,
    args = arguments,
    t_cur = +new Date()
    clearTimeout(timer)
    if (!t_start) {
      t_start = t_cur
    }
    if (t_cur - t_start >= mustDelay) {
      fn.apply(context, args)
      t_start = t_cur
    }
    else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
  let touchmove = (e) => {
    e = window.e || e
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
    // 一个手指
    if (e.targetTouches.length == 1) {
      throttle(() => {
        var touch = e.targetTouches[0]
        if (touch.pageX >= 0) {
//        console.log(123) // 节流效果查看
          // 该节点需要有c3平滑属性transition
          obj.style.transform = "translate3d("+ touch.pageX +"px, 0, 0)"
        }
      }, 50, 100) // TODO 如果有性能问题，在这里微调
    }
  }
  let touchstart = (e) => {
    e = window.e || e
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
    var touch = e.targetTouches[0]
    if (touch.pageX <= 20) { // TODO 到安卓后改为20,测试可调为100
      is = true
      obj.addEventListener('touchmove', touchmove, false)
    }
  }
  obj.addEventListener("touchend", (e) => {
    e = window.e || e
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
    if (!is) {
      return
    }
    let touch = e.changedTouches[0]
    let dom = window.getComputedStyle(obj, null)
    if (touch.pageX < (parseInt(dom.width) / 2)) {
      setTimeout(() => {
        obj.style.transform = "translate3d(0, 0, 0)"
      }, 100)
    } else {
      call && call()
    }
    is = false
    obj.removeEventListener("touchmove", touchmove)
  }, false)
  obj.addEventListener("touchstart", touchstart, false)
}

const M_touchMove_pic = (klass, el, call) => {
  const obj = D.getElementsByClassName(klass)[0] // 一些获取节点的
  const obj_style = window.getComputedStyle(obj, null)
  const $el = $(el)
  const $el_style = window.getComputedStyle($el.children[0], null)
  if (!obj) {
    return  
  }
  let timer = null // 截流的开关
  let t_start // 截流的
//let is = false
  let down_is = 'first' // 第一次touchstart的标识
  let touchStart = {} // 并赋值给他
  
  let touchEnd_out // 下拉out
  const throttle = function (fn, delay, mustDelay) { // 截流核心函数
    let context = this,
    args = arguments,
    t_cur = +new Date()
    clearTimeout(timer)
    if (!t_start) {
      t_start = t_cur
    }
    if (t_cur - t_start >= mustDelay) {
      fn.apply(context, args)
      t_start = t_cur
    }
    else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
  let touchmove = (e) => {
    e = window.e || e
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
    let _obj = e.target // 获取当前dom元素
    // 一个手指
    if (!touchStart.two) {
      throttle(() => {
        var touch = e.targetTouches[0]
        
//        console.log(touchStart.pageY, touch.pageY)
        if (down_is === 'first') {
//        let child = obj.children[0]
          // TODO 这个很重要，有耦合性，效果：如果better-scroll在移动的话，这个就不触发
          let trs = $el_style.transform.split(',')
          trs = parseInt(trs[trs.length - 2])
          
          // 第一个判断是触摸的模糊大小
          if (Math.abs(touch.pageX - touchStart.pageX) < 3 && touch.pageY > touchStart.pageY && trs % parseInt(obj_style.width) === 0) {
            down_is = true // 触发下拉touchmove的标识
          }
        } else if (down_is) {

          let diff = touch.pageY - touchStart.pageY // 大于0，则为下拉
          let _diff = touch.pageX - touchStart.pageX // 左右移动,-为左，+为右
          let val = touchEnd_out = diff / parseInt(obj_style.height) // 计算下拉的百分比
          let _val = _diff / parseInt(obj_style.width) // 计算左右的百分比
          let opc = 1 - val // 计算放大缩小以及透明度
          // TODO 微信好像是，手指点击的那个点就是中心点，不过没必要那么仿真了。
//        _obj.style['transform-origin'] = _val * 100 +'% '+ val * 100 / 2 +'% 0'
          _obj.style.transform = 'translate('+ _val * 100 +'%, '+ val * 100 / 2 +'%) translateZ(0px) scale3d('+ (opc >= 1 ? 1 : 1 - val / 2) +', '+ (opc >= 1 ? 1 : 1 - val / 2) +', 1)'
//        _obj.style.transform = 'translate('+ _val * 100 +'%, '+ val * 100 / 2 +'%) translateZ(0px) scale3d('+ (opc >= 1 ? 1 : 1 - val / 2) +', '+ (opc >= 1 ? 1 : 1 - val / 2) +', 1)'
          obj.style.opacity = 1 - val * 2
//        console.log(opc)
        }
      }, 35, 80) // TODO 如果有性能问题，在这里微调
    } else {
      // 两颗手指的图片放大缩小操作 do something......
    }
  }
  let touchstart = (e) => {
    e = window.e || e
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
    let touch = e.targetTouches[0]
    if (e.targetTouches.length == 1) { // 一颗手指
      touchStart = {
        pageX: touch.pageX,
        pageY: touch.pageY
      }
    } else { // 多颗手指的时候
      let touch1 = e.targetTouches[1]
      touchStart = {
        one: {
          pageX: touch.pageX,
          pageY: touch.pageY
        },
        two: {
          pageX: touch1.pageX,
          pageY: touch1.pageY
        }
      }
    }
    
    down_is = 'first'
    obj.addEventListener('touchmove', touchmove, false)
  }
  obj.addEventListener("touchend", (e) => {
    e = window.e || e
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
    let _obj = e.target // 获取当前dom元素
    if (touchEnd_out * 100 > 40) { // 超出下限模拟值，则返回
      call && call({
        slide: false // 返回的时候取消滚动效果
      })
    } else { // 还有双指的操作，等会else if
      // 这里先当做普通的反弹
      // 有这个问题
      setTimeout(() => {
        _obj.style.transform = 'translate(0, 0) translateZ(0px) scale3d(1, 1, 1)'
        obj.style.opacity = 1
      }, 100)
      
    }
    
//  down_is = 'first'
//  if (touch.pageX < (parseInt(dom.width) / 2)) {
//    setTimeout(() => {
//      obj.style.transform = "translate3d(0, 0, 0)"
//    }, 100)
//  } else {
//    call && call()
//  }
//  is = false
    
    obj.removeEventListener("touchmove", touchmove)
  }, false)
//}
  
//$el
  obj.addEventListener("touchstart", touchstart, false)
//for (let i = 0; i < $el.length; i++) {
//  let _obj = $el[i]
//  _obj.addEventListener("touchstart", touchstart, false)
//}
}

class M_Proms { // 异步链式调用
  constructor (fn) {
    this.arr = []
    this.count = -1
    fn(this)
  }
  then (r) {
    if (typeof (r) === 'function') {
      this.arr.push(r)
      return this
    } else {
      this.arr[++this.count] && this.arr[this.count](this, r)
    }
  }
}

const M_userAgent = () => {
  var output = {}
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    output['ios'] = true
  } else if (navigator.userAgent.match(/android/i)) {
    output['android'] = true
  }
  return output
}

const M_visibilitychange = (fn) => { // 移动端，从后台进入页面时，触发回调
  const handle = () => {
    if (D.visibilityState && D.visibilityState === 'visible' || 
    D.webkitVisibilityState && D.webkitVisibilityState === 'visible' ||
    D.mozVisibilityState && D.mozVisibilityState === 'visible' ||
    D.msVisibilityState && D.msVisibilityState === 'visible') {
      fn && fn()
      D.removeEventListener('visibilitychange', handle)
      D.removeEventListener('webkitvisibilitychange', handle)
      D.removeEventListener('mozvisibilitychange', handle)
      D.removeEventListener('msvisibilitychange', handle)
    }
  }
  D.addEventListener('visibilitychange', handle)
  D.addEventListener('webkitvisibilitychange', handle)
  D.addEventListener('mozvisibilitychange', handle)
  D.addEventListener('msvisibilitychange', handle)
}

//const M_setInterval = (fn, timer) => {
//let _timer = new Date().getTime()
//let is = false
//while (!is) {
//  
//}
//}

export {
  M_Touch,
  M_NumberPlusReduce,
  $,
  M_touchMove,
  M_findClass,
  M_decimal,
  M_Proms,
  M_userAgent,
  M_visibilitychange,
  M_touchMove_pic
//M_setInterval
}
