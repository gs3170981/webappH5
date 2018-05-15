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

export {
  M_Touch,
  M_NumberPlusReduce,
  $
}
