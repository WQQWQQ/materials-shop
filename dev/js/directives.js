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
      scope:{
        images:"=",
        click:"&"
      },
      template: '<div class="carousel"><ion-slide-box show-pager="true" auto-play="true" does-continue="true" slide-interval="3000">' +
      '<ion-slide ng-repeat="img in images">' +
      '<img ng-click="click()" ng-src="' + localImgUrl + '{{img}}" width="100%"/>' +
      '</ion-slide>' +
      '</ion-slide-box></div>'
    }
  }])
  .directive("sumBar", ["$icu",'Carts', function ($icu,Carts) {
    return {
      restrict: "E",
      replace: true,
      scope:{
        pay:"&",
        count:"@",
        total:"@"
      },
      template: '<div class="bar row row-center bar-footer bar-light sum-bar">'+
                  '<div class="col col-67">'+
                    '<button class="button button-icon icon ion-ios-cart inline-center" ng-click="goCart()">'+
                      '<span class="round-badge badge-assertive">{{count}}</span>'+
                    '</button>'+
                    '<span class="inline-center">合计：<i>{{total | price}}</i></span>'+
                  '</div>'+
                  '<div class="col col-33 tac" ng-click="pay()">'+
                    '<span class="inline-center">结算</span>'+
                  '</div>'+
                '</div>',
      compile:function (ele, attr) {
        attr.hasTabs==1 && ele.addClass("has-tabs");
        attr.showCart!=1 && ele.find("button").remove();
        return function ($scope,$ele,$attr) {
          $scope.goCart=function () {
            $icu.go("tab.carts");
          };
          // $scope.pay=function () {
          //   alert("pay");
          // };
        }
      }
    }
  }])
  // .directive("",["$icu",function ($icu) {
  //
  // }])
