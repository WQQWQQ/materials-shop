angular.module('controllers', [])

  .controller('RecommendCtrl', ["$scope", '$icu', 'User', 'Carts', function ($scope, $icu, User, Carts) {
    $scope.$on("$ionicView.beforeEnter", function () {
      User.hasLogin || $icu.go("tab.login");
      $icu.clearHistory();
      $scope.cartCount = Carts.count;
      $scope.totalPrice = Carts.totalPrice;
      $scope.imgArr = ['perry.png', 'ben.png', 'max.png', 'mike.png'];
    });
    $scope.pay = function () {
      alert("pay");
    };
    $scope.click = function () {
      alert(1);
    };
  }])

  .controller('CartsCtrl', ["$scope", "Chats", 'Carts', function ($scope, Chats, Carts) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    // $scope.$on('$ionicView.beforeEnter', function(e) {
    //   $scope.cartCount=Carts.count;
    // });

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
    $scope.addCart = function () {
      Carts.addCart();
      alert(Carts.count);
    };
    $scope.pay = function () {
      alert("pay1");
    };
    $scope.deleteCart = function () {
      Carts.deleteCart();
      alert(Carts.count);
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
      $scope.centerSettings = {
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'center'
      };
      $scope.formSettings = {
        theme: 'mobiscroll'
      };

      $scope.settings = {
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'bottom'
      };
    });
    $scope.login = function () {
      User.login();
    };
  }])
  .controller('EditPasswordCtrl', ["$scope", '$icu', 'User', function ($scope, $icu, User) {
    $scope.$on("$ionicView.enter", function () {
      $scope.config = {
        phone: "",
        code: "",
        psw: ""
      };
    });
    $scope.editPassword = function () {

    };
  }])
  .controller('RegisterCtrl', ["$scope", '$icu', 'User', function ($scope, $icu, User) {
    $scope.$on("$ionicView.enter", function () {
      $scope.config = {
        name: "",
        phone: "",
        code: "",
        psw: ""
      };
    });
    $scope.register = function () {

    };
  }])
