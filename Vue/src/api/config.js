// import Ajax from 'common/ajax.js'
//import axios from 'axios'
const CODE_OK = 'OK'
const CODE_ERR = r => {
  console.error(r.url, r.info)
}


//const API_test = (data, fn) => {
//let url = '/api/test/test.php'
//axios.post(url, data).then(res => {
//  if (res.code === CODE_OK) {
//    fn(res)
//  } else {
//    CODE_ERR({url: url, info: res})
//  }
//}).catch(res => CODE_ERR({url: url, info: res}))
//}
const API_banner = (data, fn) => {
  let res = {"code":0,"data":{"slider":[{"linkUrl":"https://y.qq.com/m/act/KingCross/index.html?ADTAG=jiaodiantu","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/276899.jpg","id":15571},{"linkUrl":"https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2271035&g_f=shoujijiaodian","picUrl":"http://y.gtimg.cn/music/photo_new/T003R720x288M000000XR39M2eBuRw.jpg","id":15490},{"linkUrl":"https://y.qq.com/apg/242/index.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/276716.jpg","id":15549},{"linkUrl":"http://y.qq.com/w/album.html?albummid=001QEmNL0Wl3Yg","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/277011.jpg","id":15583},{"linkUrl":"https://y.qq.com/m/act/HiddenSinger2/v3/index.html?ADTAG=jiaodiantu&_video=true","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/276939.jpg","id":15560}],"radioList":[{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg","Ftitle":"热歌","radioid":199},{"picUrl":"http://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg","Ftitle":"一人一首招牌歌","radioid":307}],"songList":[]}}
  fn(res)
}

const API_commission = (data, fn) => { // 佣金概况
  let res = []
  if (data.title === '全部' || data.title === '臻商贷' || data.title === '信用卡') {
    res = [
      ['17-10', '17-11', '17-12', '18-01', '18-02', '18-03', '18-04', '18-05', '17-10', '17-11', '17-12', '1月', '2月', '3月', '4月', '5月'],
      [90, 70, 100, 120, 80, 156, 110, 65, 90, 70, 100, 120, 80, 156, 110, 65]
    ]
  } else if (data.title === '活动奖励' || data.title === '臻车贷') {
    res = [
      ['17-10', '17-11', '17-12', '18-01', '18-02', '18-03', '18-04', '18-05', '17-10', '17-11', '17-12', '1月', '2月', '3月', '4月', '5月'],
      [190, 70, 100, 120, 180, 156, 110, 65, 90, 70, 100, 220, 180, 176, 110, 165]
    ]
  }
  fn(res)
}
const API_taskRecord = (data, fn) => { // 佣金概况
  let res = [
    {
      id: 'a',
      timer: '2018.03.17 — 2018.05.17',
      count: 30,
      now: 24,
      type: 'false',
      img: require('common/image/home_icon_loan.png'),
      title: '臻商贷限时推广',
    }, 
    {
      id: 'b',
      timer: '2018.03.17 — 2018.05.17',
      count: 30,
      now: 30,
      type: 'true',
      img: require('common/image/home_icon_car.png'),
      title: '臻车贷限时推广'
    }, {
      id: 'c',
      timer: '2018.03.17 — 2018.05.17',
      count: 30,
      now: 24,
      type: 'loading',
      img: require('common/image/home_icon_card.png'),
      title: '信用卡限时推广'
    }
  ]
  fn(res)
}
export {
  API_test,
  API_banner,
  API_commission,
  API_taskRecord
}
