angular.module('services', ['ngCordova'])

  .factory('Chats', [function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  }])
  .factory('$icu', ['$ionicHistory', '$ionicScrollDelegate', '$http', '$ionicModal', '$ionicPopup', '$ionicLoading', '$state', '$ionicPopover', '$location', '$ionicActionSheet', '$ionicTabsDelegate', '$cordovaStatusbar', function ($ionicHistory, $ionicScrollDelegate, $http, $ionicModal, $ionicPopup, $ionicLoading, $state, $ionicPopover, $location, $ionicActionSheet, $ionicTabsDelegate, $cordovaStatusbar) {
    var popup = null,
      sheet = null;
    return {
      platform: ionic.Platform.platform(),
      alert: function (conf, success) {
        if (!popup) {
          popup = $ionicPopup.alert({
            title: conf.title || "提示",
            subTitle: conf.subT || null,
            template: conf.tpl,
            okText: conf.text || "我知道啦~",
            cssClass: conf.class || "",
            okType: conf.type
          });
          popup.then(function () {
            success && success();
            popup = null;
          });
        }
      },
      confirm: function (conf, success, fail) {
        if (!popup) {
          popup = $ionicPopup.confirm({
            template: conf.tpl,
            title: conf.title || "提示",
            subTitle: conf.subT || null,
            cancelText: conf.cText || "取消",
            okText: conf.oText || "确定",
            okType: conf.oType || "",
            cancelType: conf.cType || "",
            cssClass: conf.class || ""
          });
          popup.then(function (res) {
            if (res) {
              success && success();
            } else {
              fail && fail();
            }
            popup = null;
          });
        }
      },
      show: function (conf, buttons) {
        if (!popup) {
          popup = $ionicPopup.show({
            template: conf.tpl,
            title: conf.title || "提示",
            subTitle: conf.subT || null,
            scope: conf.scope || null,
            cssClass: conf.class || "",
            buttons: buttons
          });
        }
      },
      sheet: function (conf, success, cancel, destruct) {
        sheet = $ionicActionSheet.show({
          buttons: conf.buttons,
          cssClass: conf.class,
          cancelOnStateChange: conf.flag || true,
          destructiveText: conf.dText || '删除',
          titleText: conf.title,
          cancelText: conf.cText || '取消',
          destructiveButtonClicked: function () {
            destruct && destruct();
          },
          cancel: function () {
            cancel && cancel();
          },
          buttonClicked: function (index) {
            success && success(index);
            return true;
          }
        });
      },
      hint: function (conf, success) {
        $ionicLoading.show({
          template: conf.tpl || "载入中...",
          scope: conf.scope,
          noBackdrop: conf.bg,
          delay: conf.delay,
          duration: conf.time || 2500
        }).then(function () {
          success && success();
        });
      },
      modal: function (conf, show, hide) {
        $ionicModal.fromTemplateUrl(conf.url, {
          scope: conf.scope,
          animation: conf.animation || 'slide-in-up',
          focusFirstInput: conf.focus || true
        }).then(function (modal) {
          conf.scope.modal = modal;
          conf.scope.$on('$destroy', function () {
            conf.scope.modal.remove();
          });
          conf.scope.$on('modal.hidden', function () {
            hide && hide();
          });
          conf.scope.$on('modal.shown', function () {
            show && show();
          });
        });
      },
      popover: function (conf, show, hide) {
        $ionicPopover.fromTemplate(conf.tpl, {
          scope: conf.scope,
          focusFirstInput: conf.focus || true
        }).then(function (popover) {
          conf.scope.popover = popover;
          conf.scope.showPopover = function ($event) {
            conf.scope.popover.show($event);
          };
          conf.scope.$on('$destroy', function () {
            conf.scope.popover.remove();
          });
          conf.scope.$on('popover.shown', function () {
            show && show();
          });
          conf.scope.$on('popover.hidden', function () {
            hide && hide();
          });
        });
      },
      clearHistory: function () {
        $ionicHistory.clearHistory();
      },
      back: function (backCount) {
        $ionicHistory.goBack(backCount);
      },
      go: function (state) {
        $state.go(state);
      },
      scrollBottom: function (animate, handle) {
        handle ? $ionicScrollDelegate.$getByHandle(handle).scrollBottom(!!animate) : $ionicScrollDelegate.scrollBottom(!!animate);
      },
      scrollTop: function (animate, handle) {
        handle ? $ionicScrollDelegate.$getByHandle(handle).scrollTop(!!animate) : $ionicScrollDelegate.scrollTop(!!animate);
      },
      resize: function (handle) {
        handle ? $ionicScrollDelegate.$getByHandle(handle).resize() : $ionicScrollDelegate.resize();
      },
      setStatusBarStyle: function (status) {
        if (this.platform == "ios") {
          status = Number(status) || 0; //默认黑字
          $cordovaStatusbar.style(status);
        }
      },
      showTab: function (show) {
        $ionicTabsDelegate.showBar(show);
      },
      getPath: function () {
        return $location.path();
      },
      getNetworkState: function () {
        return navigator.connection.type;
      },
      showToast: function (conf, success, error) {
        if (window.plugins && window.plugins.toast) {
          window.plugins.toast.showWithOptions({
            message: conf.msg || "",
            duration: conf.time || "short",
            position: conf.position || "center",
            addPixelsY: conf.offset || 0,
            data: conf.data || {},
            styling: {
              opacity: conf.style && conf.style.opa ? conf.style.opa : 0.8,
              backgroundColor: conf.style && conf.style.bg ? conf.style.bg : '#333333',
              textSize: conf.style && conf.style.size ? conf.style.size : 13,
              textColor: conf.style && conf.style.color ? conf.style.color : "#FFFFFF",
              cornerRadius: conf.style && conf.style.radius ? conf.style.radius : 20,
              horizontalPadding: conf.style && conf.style.hPadding ? conf.style.hPadding : 50,
              verticalPadding: conf.style && conf.style.vPadding ? conf.style.vPadding : 30
            }
          }, function (result) {
            success && success(result);
          }, function (b) {
            error && error();
          });
        }
      },
      ajax: function (url, param, success, fail) {
        if (this.getNetworkState() != Connection.NONE) {
          $http({
            url: url + "?callback=JSON_CALLBACK",
            method: "JSONP",
            params: param
          }).then(function (data) {
            success && success(data);
          }, function (data) {
            fail && fail(data);
          }).finally(function () {
            // $icu.hide();
          });
        } else {
          this.showToast({msg: "无网络连接，请检查您的网络是否正常", position: "bottom"});
        }
      },
      call: function (tel, success) {
        var $this = this;
        if (window.plugins && window.plugins.CallNumber) {
          tel = $this.platform == "ios" ? "tel:" + tel : tel;
          window.plugins.CallNumber.callNumber(function () {
            success && success();
          }, function () {
            $this.showToast({msg: "拨打电话失败"});
          }, tel);
        } else {
          $this.showToast({msg: "拨打电话失败"});
        }
      },
    }
  }])
  .factory("$storage", [function () {
    return {
      s: window.localStorage,
      get: function (key) {
        if (this.s.getItem(key)) {
          return JSON.parse(this.s.getItem(key));
        }
        return false;
      },
      set: function (key, val) {
        if (typeof val == "object") {
          this.s.setItem(key, JSON.stringify(val));
        } else {
          this.s.setItem(key, val);
        }
      },
      remove: function (key) {
        this.s.removeItem(key);
      },
      clear: function () {
        this.s.clear();
      }
    };
  }])
  .factory("$time", ['$interval', function ($interval) {
    return {
      format: function (num) {
        num = num.toString();
        return num.length == 1 ? "0" + num : num;
      },
      countDown: function (time, callback) {
        var $this = this;
        var s = time.second ? Number(time.second) : 0;
        var m = time.minute ? Number(time.minute) : 0;
        var h = time.hour ? Number(time.hour) : 0;
        var interval;
        interval = $interval(function () {
          if (s == 0) {
            if (m > 0) {
              s = 60;
              m--;
            } else {
              if (h > 0) {
                s = 60;
                m = 59;
                h--;
              } else {
                $interval.cancel(interval);
                callback && callback();
                return;
              }
            }
          }
          s--;
          time.hour = $this.format(h);
          time.minute = $this.format(m);
          time.second = $this.format(s);
        }, 1000);
      },
      toTime: function (millisecond) {
        var time = {};
        var allSecond = Math.floor(millisecond / 1000);
        time.hour = Math.floor(allSecond / 3600);
        time.minute = Math.floor((allSecond % 3600) / 60);
        time.second = allSecond - time.minute * 60 - time.hour * 3600;
        return time;
      }
    }
  }])
  .factory("User", ["$icu", function ($icu) {
    return {
      hasLogin: false,
      hasReg: false,
      login: function () {
        this.hasLogin = true;
        $icu.go("tab.recommend");
      },
      register: function () {
        this.hasReg = true;
      },
    }
  }])
  .factory("Carts",["$icu",function ($icu) {
    return{
      count:12,
      totalPrice:232,
      cart:[],
      getCart:function () {

      },
      deleteCart:function () {
        this.count-=1;
      },
      addCart:function () {
        this.count+=1;
      }
    }
  }])
