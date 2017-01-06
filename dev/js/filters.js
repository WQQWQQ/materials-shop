angular.module('filters', [])

  .filter('price', [function () {
    return function (text) {
      return isNaN(Number(text)) ? text : "￥" + Number(text).toFixed(2);
    }
  }]);
