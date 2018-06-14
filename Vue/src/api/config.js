// import Ajax from 'common/ajax.js'
import axios from 'axios'
import { MessageBox } from 'mint-ui'
import { M_decimal, M_userAgent } from 'common/js/methods.js'
//const URL = 'http://192.168.20.175:8061'
//const URL = 'http://39.108.15.199:8061'

//const URL = 'http://114.55.86.215/zfq'

//const URL = location.protocol + location.host + '/zfq'
const URL = '/zfq'
//const URL = '/api'
const CODE_OK = 0
const FAKE = false // true:假数据 false:真数据

const CODE_ERR = (r, type) => { // 封装失败的回调
//alert(JSON.stringify(r))
  type ? MessageBox.alert('接口查询失败，请联系管理员！', '温馨提示') : MessageBox.alert('服务器炸啦，正在抢修中！', '温馨提示')
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
    const dataHandle = (res) => {
      return res
    }
    if (FAKE) {
      let res = {obj:{"orderTime":"20180531110901","orderMoney":"1.0","notifyUrl":"http://39.108.15.199:8061/reimbursement/callback.json","merid":"yft2017082500005","sing":"921a40e85b88a5a63f9cf91f9cc2f4dc","merchantOutOrderNo":"20180531110901743","noncestr":"jiexinanbao"}}
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
    let urlscheme = M_userAgent().ios ? 'alipay' : 'alipays'
    if (FAKE) {
      let res = urlscheme + "://platformapi/startApp?appId=10000011&url=http%3A%2F%2Fjh.yizhibank.com%2Fapi%2FcreateOrder%3FmerchantOutOrderNo%3D20180601105137%26merid%3Dyft2017082500005%26noncestr%3Dpay%26notifyUrl%3Dhttp%3A%2F%2Fjh.yizhibank.com%2Fapi%2Fcallback%26orderMoney%3D1.00%26orderTime%3D20180601105137%26%26sign%3D0a16ece94b5492e6d6981b379d0c860b"
      fn(res)
      return
    }
    let res = urlscheme + '://platformapi/startApp?appId=10000011&url=' + encodeURIComponent('https://alipay.3c-buy.com/api/createOrder' + data)
    fn(res)
  },
  '/api/createQuickOrder' (url, data, fn) { // 银联付款API
//  let urlscheme = M_userAgent().ios ? 'alipay' : 'alipays'
    if (FAKE) {
      let res = "http://alipay.3c-buy.com/api/createQuickOrder?merchantOutOrderNo=20180601112943&merid=yft2017082500005&noncestr=pay&notifyUrl=http://jh.yizhibank.com/api/callback&orderMoney=1.00&orderTime=20180601112943&&sign=62c1593a6e8514ff75f755b45381920e"
      fn(res)
      return
    }
    let res = 'http://alipay.3c-buy.com/api/createQuickOrder' + data
    fn(res)
  },
  '/reimbursement/querypaystatus' (url, data, fn) { // 查询订单是否支付成功
    const dataHandle = (res) => { // 数据处理，相应的字段保留两位小数
      return res
    }
    if (FAKE) {
      let res = {"code":0,"obj":{"payResult": 1}}
      fn(dataHandle(res.obj))
      return
    }
    axios.post(url, data, FORMDATA).then(res => {
      res = res.data
//    alert(JSON.stringify(res))
      if (res.code === CODE_OK) {
        fn(dataHandle(res.obj))
      } else {
        CODE_ERR({url: url, info: res}, true)
      }
    })
//  .catch(res => {
//    CODE_ERR({url: url, info: res})
//  })
  },
  '/m/zed/queryCheckingOrder' (url, data, fn) { // 审核中分期列表
    const dataHandle = (res) => {
      return res
    }
    if (FAKE) {
      let res = {"code":0,"obj":{"list":[{"applyId":644,"name":"刘国","idCardNo":"370921198211010016","sex":1,"mobile":"17863825666","checkStatus":2,"icon_url":null,"productName":"联网报警服务","amount":10000,"repayTotalTimes":12,"orderNo":"E5abF-10120171123145208","companyName":"泰安市汇隆网络科技有限公司","shopNo":"010152","shopName":"信合苑卫生服务站","interest":null,"contractNo":"101","startDate":1511452800000,"endDate":1542902400000,"created":1511420743000,"employeeMobile":"17863825666","failReason":null,"alreadyRepayTimes":null,"paidAmount":null,"overdueCount":null,"quareTime":null,"stopTime":null,"indexCurrent":null,"currentTime":null,"currentMoney":null,"overdues":null,"overdueRepayDate":null,"durationTime":null},{"applyId":650,"name":"刘国","idCardNo":"370921198211010016","sex":1,"mobile":"13853858078","checkStatus":6,"icon_url":null,"productName":"联网报警服务","amount":120000,"repayTotalTimes":12,"orderNo":"E5abF-10120171123151620","companyName":"泰安市汇隆网络科技有限公司","shopNo":"010152","shopName":"信合苑卫生服务站","interest":null,"contractNo":"211","startDate":1511366400000,"endDate":1542816000000,"created":1511421665000,"employeeMobile":"13853858078","failReason":" 测试","alreadyRepayTimes":null,"paidAmount":null,"overdueCount":null,"quareTime":null,"stopTime":null,"indexCurrent":null,"currentTime":null,"currentMoney":null,"overdues":null,"overdueRepayDate":null,"durationTime":null},{"applyId":644,"name":"刘国","idCardNo":"370921198211010016","sex":1,"mobile":"17863825666","checkStatus":2,"icon_url":null,"productName":"联网报警服务","amount":10000,"repayTotalTimes":12,"orderNo":"E5abF-10120171123145208","companyName":"泰安市汇隆网络科技有限公司","shopNo":"010152","shopName":"信合苑卫生服务站","interest":null,"contractNo":"101","startDate":1511452800000,"endDate":1542902400000,"created":1511420743000,"employeeMobile":"17863825666","failReason":null,"alreadyRepayTimes":null,"paidAmount":null,"overdueCount":null,"quareTime":null,"stopTime":null,"indexCurrent":null,"currentTime":null,"currentMoney":null,"overdues":null,"overdueRepayDate":null,"durationTime":null},{"applyId":644,"name":"刘国","idCardNo":"370921198211010016","sex":1,"mobile":"17863825666","checkStatus":2,"icon_url":null,"productName":"联网报警服务","amount":10000,"repayTotalTimes":12,"orderNo":"E5abF-10120171123145208","companyName":"泰安市汇隆网络科技有限公司","shopNo":"010152","shopName":"信合苑卫生服务站","interest":null,"contractNo":"101","startDate":1511452800000,"endDate":1542902400000,"created":1511420743000,"employeeMobile":"17863825666","failReason":null,"alreadyRepayTimes":null,"paidAmount":null,"overdueCount":null,"quareTime":null,"stopTime":null,"indexCurrent":null,"currentTime":null,"currentMoney":null,"overdues":null,"overdueRepayDate":null,"durationTime":null},{"applyId":644,"name":"刘国","idCardNo":"370921198211010016","sex":1,"mobile":"17863825666","checkStatus":2,"icon_url":null,"productName":"联网报警服务","amount":10000,"repayTotalTimes":12,"orderNo":"E5abF-10120171123145208","companyName":"泰安市汇隆网络科技有限公司","shopNo":"010152","shopName":"信合苑卫生服务站","interest":null,"contractNo":"101","startDate":1511452800000,"endDate":1542902400000,"created":1511420743000,"employeeMobile":"17863825666","failReason":null,"alreadyRepayTimes":null,"paidAmount":null,"overdueCount":null,"quareTime":null,"stopTime":null,"indexCurrent":null,"currentTime":null,"currentMoney":null,"overdues":null,"overdueRepayDate":null,"durationTime":null},{"applyId":644,"name":"刘国","idCardNo":"370921198211010016","sex":1,"mobile":"17863825666","checkStatus":2,"icon_url":null,"productName":"联网报警服务","amount":10000,"repayTotalTimes":12,"orderNo":"E5abF-10120171123145208","companyName":"泰安市汇隆网络科技有限公司","shopNo":"010152","shopName":"信合苑卫生服务站","interest":null,"contractNo":"101","startDate":1511452800000,"endDate":1542902400000,"created":1511420743000,"employeeMobile":"17863825666","failReason":null,"alreadyRepayTimes":null,"paidAmount":null,"overdueCount":null,"quareTime":null,"stopTime":null,"indexCurrent":null,"currentTime":null,"currentMoney":null,"overdues":null,"overdueRepayDate":null,"durationTime":null}]}}
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
  API[obj.url](URL + obj.url + '.json', obj.data, obj.success)
}

export default AJAX
