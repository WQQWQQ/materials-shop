/**
 * Created by Quincy on 2016/12/25.
 */
angular.module('configs', [])

  .constant('API', {

  })
  .constant("localImgUrl", "../img/")
  .constant("serverImgUrl", "http://localhost:3333/img/")
// .constant("imgUrl","http://4008003220.com/")
// .constant("imgUrl","http://test.4008003220.com/")

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

angular.module('filters', [])

  .filter('price', [function () {
    return function (text) {
      return isNaN(Number(text)) ? text : "￥" + Number(text).toFixed(2);
    }
  }]);

angular.module('directives', [])

  .directive('hideTab', ["$icu", function ($icu) {
    return {
      restrict: 'A',
      link: function (scope, ele, attr) {
        scope.$on("$ionicView.beforeEnter", function () {
          $icu.showTab(attr.hideTab == "false");
        });
      }
    };
  }])
  .directive("statusBar", ["$icu", function ($icu) {
    return {
      restrict: "A",
      link: function (scope, ele, attr) {
        scope.$on("$ionicView.beforeEnter", function () {
          $icu.setStatusBarStyle(+attr.statusBar);
        });
      }
    }
  }])
  .directive("carousel", ["$icu", 'localImgUrl', function ($icu, localImgUrl) {
    return {
      restrict: "E",
      replace: true,
      template: '<div><ion-slide-box show-pager="true" auto-play="true" on-slide-changed="slideHasChanged($index)" does-continue="true" slide-interval="3000">' +
      '<ion-slide ng-repeat="img in images">' +
      '<img ng-src="' + localImgUrl + '{{img}}" width="100%"/>' +
      '</ion-slide>' +
      '</ion-slide-box></div>'
    }
  }])
  .directive("sumBar", ["$icu", function ($icu) {
    return {
      restrict: "E",
      replace: true,
      template: '<div class="bar row row-center bar-footer bar-stable">' +
                   '<div class="col col-80">' +
                        '' +
                   '<div>' +
                   '<div class="col col-20">' +
                        '' +
                   '</div>' +
                 '</div>',
      link: function (scope, ele, attr) {

      }
    }
  }])

angular.module('controllers', [])

  .controller('RecommendCtrl', ["$scope", '$icu', 'User', '$ionicHistory', function ($scope, $icu, User, $ionicHistory) {
    $scope.$on("$ionicView.beforeEnter", function () {
      User.hasLogin || $icu.go("tab.login");
      $icu.clearHistory();
      $scope.images=['perry.png','ben.png','max.png','mike.png'];
    });
  }])

  .controller('CartsCtrl', ["$scope", "Chats", function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  }])

  .controller('ChatDetailCtrl', ["$scope", "$stateParams", "Chats", function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  }])

  .controller('MyCtrl', ["$scope", function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  }])
  .controller('LoginCtrl', ["$scope", '$icu', 'User', function ($scope, $icu, User) {
    $scope.$on("$ionicView.enter", function () {
      $icu.clearHistory();
    });
    $scope.login = function () {
      User.login();
    };
  }])
  .controller('EditPasswordCtrl', ["$scope", '$icu', 'User', function ($scope, $icu, User) {
    $scope.$on("$ionicView.enter", function () {
      $scope.config={
        phone:"",
        code:"",
        psw:""
      };
    });
    $scope.editPassword = function () {

    };
  }])
  .controller('RegisterCtrl', ["$scope", '$icu', 'User', function ($scope, $icu, User) {
    $scope.$on("$ionicView.enter", function () {
      $scope.config={
        name:"",
        phone:"",
        code:"",
        psw:""
      };
    });
    $scope.register = function () {

    };
  }])

var app = angular.module('materials', ['ionic', 'ngCordova', 'configs', 'services', 'filters', 'directives', 'controllers']);

app.run(["$ionicPlatform", '$icu', '$rootScope', '$ionicHistory', '$timeout', function ($ionicPlatform, $icu, $rootScope, $ionicHistory, $timeout) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    document.addEventListener("offline", function () {
      $icu.showToast({msg: "网络已断开，请检查网络连接"});
    }, false);
    document.addEventListener("online", function () {
      $icu.showToast({msg: "网络已连接"});
    }, false);
  });
  $ionicPlatform.registerBackButtonAction(function (e) {
    if ($icu.getPath() == '/tab/login' || $icu.getPath() == '/tab/recommend') {
      if ($rootScope.backButtonPressedOnceToExit) {
        ionic.Platform.exitApp();
      } else {
        $rootScope.backButtonPressedOnceToExit = true;
        $icu.showToast({msg: "再按一次返回键退出应用"});
        $timeout(function () {
          $rootScope.backButtonPressedOnceToExit = false;
        }, 2000);
      }
    } else if ($ionicHistory.backView()) {
      $icu.back();
    } else {
      $rootScope.backButtonPressedOnceToExit = true;
      $icu.showToast({msg: "再按一次返回键退出应用"});
      $timeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);
}]);

app.config(["$stateProvider", "$urlRouterProvider", '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.style('standard');
  $ionicConfigProvider.tabs.position('bottom');
  // $ionicConfigProvider.navBar.alignTitle('center');
  // $ionicConfigProvider.views.transition('platform');
  $ionicConfigProvider.templates.maxPrefetch(20);
  $ionicConfigProvider.spinner.icon("ios-small");
  // $ionicConfigProvider.backButton.icon("ion-ios-arrow-left");
  $ionicConfigProvider.backButton.text("");
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.form.toggle("large");
  $ionicConfigProvider.form.checkbox("circle");
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.views.forwardCache(false);
  $ionicConfigProvider.views.maxCache(20);
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.recommend', {
      url: '/recommend',
      views: {
        'tab-recommend': {
          templateUrl: 'templates/recommend.html',
          controller: 'RecommendCtrl'
        }
      }
    })
    .state('tab.carts', {
      url: '/carts',
      views: {
        'tab-carts': {
          templateUrl: 'templates/carts.html',
          controller: 'CartsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-carts': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.my', {
      url: '/my',
      views: {
        'tab-my': {
          templateUrl: 'templates/my.html',
          controller: 'MyCtrl'
        }
      }
    })
    .state('tab.login', {
      url: '/login',
      views: {
        'tab-my': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('tab.edit-password', {
      url: '/edit-password',
      views: {
        'tab-my': {
          templateUrl: 'templates/edit-password.html',
          controller: 'EditPasswordCtrl'
        }
      }
    })
    .state('tab.register', {
      url: '/register',
      views: {
        'tab-my': {
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/recommend');

}]);

app.run(["$templateCache", function($templateCache) {$templateCache.put('templates/carts.html','<ion-view view-title="Chats"  hide-back-button="true" hide-tab="false">\n  <ion-content>\n    <ion-list>\n      <ion-item class="item-remove-animate item-avatar item-icon-right" ng-repeat="chat in chats" type="item-text-wrap" href="#/tab/chats/{{chat.id}}">\n        <img ng-src="{{chat.face}}">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class="icon ion-chevron-right icon-accessory"></i>\n\n        <ion-option-button class="button-assertive" ng-click="remove(chat)">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n');
$templateCache.put('templates/chat-detail.html','<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title="{{chat.name}}">\n  <ion-content class="padding">\n    <img ng-src="{{chat.face}}" style="width: 64px; height: 64px">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n');
$templateCache.put('templates/edit-password.html','<ion-view view-title="\u627E\u56DE\u5BC6\u7801" hide-tab="true" id="editPasswordView">\n  <ion-content>\n    <form novalidate name="editPswForm">\n      <div class="list">\n        <label class="item item-input">\n          <span class="input-label">\u624B\u673A\u53F7</span>\n          <input type="number" name="phone" placeholder="\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7" ng-pattern="/^1\\d{10}$/" required ng-model="config.phone">\n        </label>\n        <label class="item item-input">\n          <span class="input-label">\u9A8C\u8BC1\u7801</span>\n          <input type="number" name="code" placeholder="\u8F93\u5165\u60A8\u6536\u5230\u7684\u9A8C\u8BC1\u7801" ng-pattern="/^\\d{6}$/" ng-model="config.code" required>\n        </label>\n        <label class="item item-input">\n          <span class="input-label">\u8F93\u5165\u65B0\u5BC6\u7801</span>\n          <input type="password" name="psw" placeholder="\u8F93\u5165\u60A8\u7684\u65B0\u5BC6\u7801"  ng-model="config.psw" required>\n        </label>\n      </div>\n    </form>\n    <div class="padding-horizontal">\n      <button class="button button-block button-positive" ng-disabled="editPswForm.phone.$invalid || editPswForm.code.$invalid || editPswForm.psw.$invalid" ng-click="editPassword()">\n        \u786E\u5B9A\u4FEE\u6539\u5BC6\u7801\n      </button>\n    </div>\n  </ion-content>\n</ion-view>\n');
$templateCache.put('templates/login.html','<ion-view view-title="\u7528\u6237\u767B\u5F55" hide-tab="true" hide-back-button="true" id="loginView">\n  <ion-content class="has-footer">\n    <div class="list">\n      <label class="item item-input">\n        <span class="input-label">\u624B\u673A\u53F7</span>\n        <input type="text" placeholder="\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7">\n      </label>\n      <label class="item item-input">\n        <span class="input-label">\u5BC6\u7801</span>\n        <input type="password" placeholder="\u8F93\u5165\u60A8\u7684\u5BC6\u7801">\n      </label>\n    </div>\n    <div class="padding-horizontal">\n      <button class="button button-block button-positive" ng-click="login()">\u767B\u5F55</button>\n    </div>\n  </ion-content>\n  <div class="bar bar-footer bar-light">\n    <a class="title" href="#/tab/edit-password">\u5FD8\u8BB0\u5BC6\u7801?</a>\n  </div>\n</ion-view>\n');
$templateCache.put('templates/my.html','<ion-view view-title="Account" hide-back-button="true" hide-tab="false">\n  <ion-content>\n    <ion-list>\n    <ion-toggle  ng-model="settings.enableFriends">\n        Enable Friends\n    </ion-toggle>\n    </ion-list>\n  </ion-content>\n</ion-view>\n');
$templateCache.put('templates/recommend.html','<ion-view view-title="\u519C\u8D44\u8D85\u5E02" hide-tab="false"  hide-back-button="true">\n  <ion-nav-buttons side="secondary">\n    <button class="button button-icon icon ion-search" ng-click="search()"></button>\n  </ion-nav-buttons>\n\n  <ion-content class="has-footer">\n    <carousel></carousel>\n  </ion-content>\n  <div class="bar row row-center bar-footer bar-stable has-tabs sum-bar">\n    <div class="col col-75">\n      <button class="button button-icon icon ion-ios-cart inline-center">\n        <span class="round-badge badge-assertive">12</span>\n      </button>\n      <span class="inline-center">\u5408\u8BA1\uFF1A<i class="">\uFFE512312</i></span>\n    </div>\n    <div class="col col-25 tac">\n      <span class="inline-center">\u7ED3\u7B97</span>\n    </div>\n  </div>\n</ion-view>\n');
$templateCache.put('templates/register.html','<ion-view view-title="\u6CE8\u518C" hide-tab="true" id="registerView">\n  <ion-content>\n    <form novalidate name="registerForm">\n      <div class="list">\n        <label class="item item-input">\n          <span class="input-label">\u771F\u5B9E\u59D3\u540D</span>\n          <input type="text" name="name" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u771F\u5B9E\u59D3\u540D" required ng-model="config.name">\n        </label>\n        <label class="item item-input">\n          <span class="input-label">\u624B\u673A\u53F7</span>\n          <input type="number" name="phone" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7" ng-pattern="/^1\\d{10}$/" required ng-model="config.phone">\n        </label>\n        <label class="item item-input">\n          <span class="input-label">\u9A8C\u8BC1\u7801</span>\n          <input type="number" name="code" placeholder="\u8BF7\u8F93\u5165\u60A8\u6536\u5230\u7684\u9A8C\u8BC1\u7801" ng-pattern="/^\\d{6}$/" ng-model="config.code" required>\n        </label>\n        <label class="item item-input">\n          <span class="input-label">\u5BC6\u7801</span>\n          <input type="password" name="psw" placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801"  ng-model="config.psw" required>\n        </label>\n      </div>\n    </form>\n    <div class="padding">\n      <button class="button button-block button-positive" ng-disabled="editPswForm.phone.$invalid || editPswForm.code.$invalid || editPswForm.psw.$invalid" ng-click="register()">\n        \u6CE8\u518C\n      </button>\n      <p class="fs12">\u70B9\u51FB\u4E0A\u9762\u7684\u201C\u6CE8\u518C\u201D\u6309\u94AE\uFF0C\u5373\u8868\u793A\u60A8\u540C\u610F<a>\u82B1\u4E91\u7528\u6237\u534F\u8BAE</a></p>\n    </div>\n  </ion-content>\n</ion-view>\n');
$templateCache.put('templates/tabs.html','<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class="tabs-icon-top tabs-color-active-positive">\n\n  <ion-tab title="\u5E38\u7528" icon-off="ion-ios-pulse" icon-on="ion-ios-pulse-strong" href="#/tab/recommend">\n    <ion-nav-view name="tab-recommend"></ion-nav-view>\n  </ion-tab>\n\n  <ion-tab title="\u8D2D\u7269\u8F66" icon-off="ion-ios-chatboxes-outline" icon-on="ion-ios-chatboxes" href="#/tab/carts">\n    <ion-nav-view name="tab-carts"></ion-nav-view>\n  </ion-tab>\n\n  <ion-tab title="\u6211\u7684" icon-off="ion-ios-gear-outline" icon-on="ion-ios-gear" href="#/tab/my">\n    <ion-nav-view name="tab-my"></ion-nav-view>\n  </ion-tab>\n\n\n</ion-tabs>\n');}]);