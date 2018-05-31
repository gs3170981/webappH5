// import Ajax from 'common/ajax.js'
import axios from 'axios'
import { MessageBox } from 'mint-ui'
import { M_decimal, M_userAgent } from 'common/js/methods.js'
//const URL = 'http://192.168.20.175:8061'
//const URL = 'http://39.108.15.199:8061'
const URL = '/api'
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
  '/m/zzg/zedHome' (url, data, fn) {
    const dataHandle = (res) => { // 数据处理，相应的字段保留两位小数
      M_decimal(res, ['amount', 'remainAmount', 'currentAmount', 'nextMonthAmount'])
      for (let i = 0; i < res.list.length; i++) {
        M_decimal(res.list[i], ['amount', 'remainAmount'])
      }
      return res
    }
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
  },
  '/reimbursement/createOrder' (url, data, fn) {
    const dataHandle = (res) => { // 数据处理，相应的字段保留两位小数
//    M_decimal(res, ['amount', 'remainAmount', 'currentAmount', 'nextMonthAmount'])
//    for (let i = 0; i < res.list.length; i++) {
//      M_decimal(res.list[i], ['amount', 'remainAmount'])
//    }
      return res
    }
    if (FAKE) {
      let res = {"orderTime":"20180531110901","orderMoney":"1.0","notifyUrl":"http://39.108.15.199:8061/reimbursement/callback.json","merid":"yft2017082500005","sing":"921a40e85b88a5a63f9cf91f9cc2f4dc","merchantOutOrderNo":"20180531110901743","noncestr":"jiexinanbao"}
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
  },
  '/api/createOrder' (url, data, fn) { // 支付宝付款API
    const dataHandle = (res) => { // 数据处理，相应的字段保留两位小数
//    M_decimal(res, ['amount', 'remainAmount', 'currentAmount', 'nextMonthAmount'])
//    for (let i = 0; i < res.list.length; i++) {
//      M_decimal(res.list[i], ['amount', 'remainAmount'])
//    }
      return res
    }
    if (FAKE) {
//    let res = {"code":0,"obj":{"amount":118800,"remainAmount":89100,"historyOverdueCount":1,"count":1,"currentAmount":19800,"shopId":50339,"list":[{"mobile":null,"orderNo":"wOE9G-10120171130171937","repaymentNo":"FENQI201712010955070001","userInfoId":10088,"amount":118800,"remainAmount":89100,"shopId":50339}],"nextMonthAmount":29700,"overdueCount":0}}
//    fn(dataHandle(res.obj))
      return
    }
//  debugger
    let urlscheme = M_userAgent().ios ? 'alipay' : 'alipays'
    let gopage = urlscheme + '://platformapi/startApp?appId=10000011&url=' + encodeURIComponent('https://alipay.3c-buy.com/api/createOrder' + data)
    debugger
//  alert(gopage)
//  location.href = gopage
    
    fn(gopage)
//  merchantOutOrderNo=201708020001&merid=100001&noncestr=test&notifyUrl=http://jh.yizhibank.com/api/callback&orderMoney=1.00&orderTime=20170802132205&sign=8c284fa8fa7146abe53cd753c4427ba9

    
//  axios.post('https://alipay.3c-buy.com/api/createOrder' + data).then(res => {
//    fn(dataHandle(res))
////    res = res.data
////    if (res.code === CODE_OK) {
////      fn(dataHandle(res.obj))
////    } else {
////      CODE_ERR({url: url, info: res}, true)
////    }
//  }).catch(res => CODE_ERR({url: url, info: res}))
  }
}

const AJAX = obj => {
  API[obj.url](URL + obj.url + '.json', obj.data, obj.success)
}

export default AJAX
