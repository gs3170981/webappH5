(function (global, undefined) {
  var jiexin = {
    debug: 0,
    extdata: {},
    isIos: function () {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isiOS;
    },
    isAndroid: function () {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      return isAndroid;
    },
    openWindow: function (options) {
      //title url viewid extdata
      //打开新页面
      var self = this,
        optionsStr;
      if (options.extdata) {
        options.extdata = JSON.stringify(options.extdata);
      }
      optionsStr = JSON.stringify(options);
      if (self.debug == 1) {
        location.href = options.url || options;
      }
      else if (self.isIos()) {
        try{
        	pushViewController(optionsStr);
        }catch(e){
        	alert('该方法调用失败！pushViewController')
        }
      }
      else if (self.isAndroid()) {
        try{
          htmlToJava.getURLAndTitle(optionsStr);
        }catch(e){
          alert('该方法调用失败！pushViewController')
        }
      }
    },
    isShowRight (opt) {
      if (this.isIos()) {
        isShowRightButton(opt)
      } else if (this.isAndroid()) {
        htmlToJava.handleEDunwebViewAction(JSON.stringify(opt))
      } else {
        alert('该手机型号检测失败！')
      }
    },
//  rightEvent () {
//    
//  },
    openNewPage: function (url, params) {
      // 打开新页面
      var str = '?';
      for (var i in params) {
        str += i + '=' + params[i] + '&';
      }
      var rightStr = str.substring(0, str.length - 1);
      window.location.href = encodeURI(url + rightStr);
    },
    openShare: function (options) {
      var self = this,
        optionsStr;
      if (options.extdata) {
        options.extdata = JSON.stringify(options.extdata);
      }
      optionsStr = JSON.stringify(options);
      if (self.debug == 1) {
        location.href = options.url || options;
      }
      else if (self.isIos()) {
        pushViewController(optionsStr);
      }
      else if (self.isAndroid()) {
        htmlToJava.getURLAndTitle(optionsStr);
      }
    },
    updateBackView: function (viewid) {
      var self = this;
      //修改历史返回界面 viewid
      var optionsStr = JSON.stringify({
        viewid: viewid
      });
      if (self.isIos()) {
        updataBackViewController(optionsStr);
      }
      else if (self.isAndroid()) {
        htmlToJava.setActivityCount(viewid);
      }
    },
    isAlipay (val, call) {
      if (val) {
        this.isAlipay_c(val)
        return
      }
      this.isAlipay_c = call // 缓存
      if (this.isIos()) {
        try { // 目前在调试的情况下
        	isInstallAlipay()
        } catch(e){
          call(1)
        }
      } else if (this.isAndroid()) {
        try { // 目前在调试的情况下
          call(htmlToJava.isInstallAlipay())
        } catch(e){
          call(1)
        }
      } else {
        alert('该手机型号检测失败！')
      }
//    alert(val)
//    document.getElementById("body").innerHTML = val
    },
    back: function (viewid) {
      //返回 可传viewid
      var self = this;
      if (self.isIos()) {
        if (viewid) {
          updataBackViewController(JSON.stringify({
            viewid: viewid
          }));
        }
        else {
          popViewController();
        }
      }
      else if (self.isAndroid()) {
        if (viewid) {
          htmlToJava.setActivityCount(viewid);
        }
        else {
          htmlToJava.returnActivity();
        }
      }
    },
    addEvent: function (eventName, callback) {
      //添加自定义事件
      var self = this;
      window.addEventListener(eventName, function () {
        if (callback) {
          callback(self.extdata);
        }
      });
    },
    fireEvent: function (eventName, viewid, extdata) {
      //触发自定义事件
      var self = this;
      if (extdata) {
        extdata = JSON.stringify(extdata);
      }
      else {
        extdata = "0";
      }
      var optionsStr = JSON.stringify({
        eventName: eventName,
        viewid: viewid,
        extdata: extdata
      });
      //触发原生方法传递参数
      if (self.isIos()) {
        fireEventController(optionsStr);
      }
      else if (self.isAndroid()) {
        htmlToJava.fireEvent(eventName, viewid, extdata);
      }
    },
    returnEvent: function (eventName, extdata) {
      //原生调用返回参数触发方法 
      var self = this;
      if (eventName == 'getSession') {
        window.getSession(extdata);
        return;
      }
      var event = new Event(eventName);
      if (extdata.match("^\{(.+:.+,*){1,}\}$")) {
        extdata = JSON.parse(extdata);
      }
      self.extdata = extdata;
      window.dispatchEvent(event);
    },
    sessionFail: function () {
      var self = this;
      //登录过期 未登录
      if (self.isIos()) {
        presentLoginViewController();
      }
      else if (self.isAndroid()) {
        htmlToJava.HtmlToLogin();
      }
    },
    getSession: function () {
      var self = this;
      if (self.isIos()) {
        getSessionId();
      }
      else if (self.isAndroid()) {
        htmlToJava.HtmlGetSessionId();
      }
    },
    setFontSize: function () {
      // 移动端自适应（1rem等于10px）
      var oHtml = document.documentElement;
      var screenWidth = oHtml.clientWidth;
      if (screenWidth <= 375) {
        oHtml.style.fontSize = 10 + 'px';
      }
      else if (screenWidth >= 750) {
        oHtml.style.fontSize = 20 + 'px';
      }
      else {
        oHtml.style.fontSize = screenWidth / 750 * 20 + 'px';
      }
    },
    getUrlParam: function (name) {
      // 获取url参数
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    ringup_popup: function (phoneNum) {
      // 模拟电话弹框
      var shade = $('<div class="shade"></div>');
      var ringup = $('<div class="ringup"></div>');
      var phone = $('<div class="phone"></div>');
      var phoneNumber = $('<span class="phoneNumber">' + phoneNum + '</span>');
      var manageBox = $('<div class="manageBox"></div>');
      var cancel = $('<a href="javascript:;" class="btn cancel">取消</a>');
      var call = $('<a href="tel:' + phoneNum + '" class="btn call">呼叫</a>');
      manageBox.append(cancel);
      manageBox.append(call);
      phone.append(phoneNumber);
      ringup.append(phone);
      ringup.append(manageBox);
      $('body').append(shade);
      $('body').append(ringup);
      cancel.on('click', function () {
        shade.remove();
        ringup.remove();
        $('body').off('touchmove');
      });
      $('body').on('touchmove', function (e) {
        e.preventDefault();
      });
    }
  };
  window.jiexin = jiexin;
  if (jiexin.debug == 1) {
    window.onload = function () {
      jiexin.returnEvent('ready', 0);
    }
  }
})(window)