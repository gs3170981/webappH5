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
const M_NumberPlusReduce = (obj, now) => { // 数据自增自减，针对整数
  let timer = setInterval(r => {
    if (obj.e[obj.val] === now) {
      clearInterval(timer)
      return
    }
    if (obj.e[obj.val] > now) {
      obj.e[obj.val]--
    } else {
      obj.e[obj.val]++
    }
  }, 0)
}
const $ = (dom) => {
  return D.getElementById(dom)
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

export {
  M_Touch,
  M_NumberPlusReduce,
  $,
  M_touchMove
}
