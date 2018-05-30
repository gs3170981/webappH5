// import Ajax from 'common/ajax.js'
import axios from 'axios'
import { MessageBox } from 'mint-ui'
import { M_decimal } from 'common/js/methods.js'
//const URL = 'http://192.168.20.175:8061'
const URL = 'http://39.108.15.199:8061'
const CODE_OK = 0
const FAKE = false // true:假数据 false:真数据

const CODE_ERR = (r, type) => { // 封装失败的回调
  type ? MessageBox.alert('网络好像开了点小差？', '提示') : MessageBox.alert('服务器炸啦，正在抢修中！', '提示')
  console.error(r.url, r.info)
}
const FORMDATA = { // axios formData提交的配置项
  transformRequest: [(data) => {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
const API = {
  '/zzg/zedHome' (data, fn) {
    const dataHandle = (res) => { // 数据处理，相应的字段保留两位小数
      M_decimal(res, ['amount', 'remainAmount', 'currentAmount', 'nextMonthAmount'])
      for (let i = 0; i < res.list.length; i++) {
        M_decimal(res.list[i], ['amount', 'remainAmount'])
      }
      return res
    }
    let url = URL + '/m/zzg/zedHome.json'
    if (FAKE) {
      let res = {"code":0,"obj":{"amount":118800,"remainAmount":89100,"historyOverdueCount":1,"count":1,"currentAmount":19800,"shopId":50339,"list":[{"mobile":null,"orderNo":"wOE9G-10120171130171937","repaymentNo":"FENQI201712010955070001","userInfoId":10088,"amount":118800,"remainAmount":89100,"shopId":50339}],"nextMonthAmount":29700,"overdueCount":0}}
      fn(dataHandle(res.obj))
      return
    }
    axios.post(url, data, FORMDATA).then(res => {
      res = res.data
      if (res.code === CODE_OK) {
        fn(dataHandle(res.obj))
      } else {
        CODE_ERR({url: url, info: res}, true)
      }
    }).catch(res => CODE_ERR({url: url, info: res}))
  }
}

const AJAX = obj => {
  API[obj.url](obj.data, obj.success)
}

export default AJAX
