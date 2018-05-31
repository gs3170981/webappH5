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

class M_Proms { // 链式调用
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

export {
  M_Touch,
  M_NumberPlusReduce,
  $,
  M_touchMove,
  M_findClass,
  M_decimal,
  M_Proms,
  M_userAgent
}
