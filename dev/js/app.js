var app = angular.module('materials', ['ionic','ngCordova', 'configs', 'services', 'filters', 'directives', 'controllers']);

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
