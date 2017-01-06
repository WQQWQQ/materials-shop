var URL = {
    base: 'http://localhost:8090/',
    js: 'http://localhost:3333/js/',
    css: 'http://localhost:3333/css/',
    imgUrl: 'http://localhost:3333/img/',

    // js: 'http://test.4008003220.com/Public/ng_app/V2/',
    // base: 'http://test.4008003220.com/',
    // base_old:'http://test.4008003220.com/',

    // base: 'http://4008003220.com/',
    // js:'http://4008003220.com/Public/ng_app/V2/',
    // base_old:'http://4008003220.com/',
  },
  versions = Math.random();
require.config({
  paths: {
    "jQuery": "../lib/jquery-3.1.1",
    'ionic': '../lib/ionic/js/ionic.bundle',
    'ngCordova': '../lib/ng-cordova.min',
    'mobiscroll':'../lib/mobiscroll/js/mobiscroll.min',
    "c":URL.js+'controllers.js?'+versions,
    "app":URL.js+'app.js?'+versions,
    "s":URL.js+'services.js?'+versions,
    "f":URL.js+'filters.js?'+versions,
    "d":URL.js+'directives.js?'+versions,
    "config":URL.js+'configs.js?'+versions,
    // "t":URL.js+'templates.js?'+versions,
    // 'app': URL.js + 'materials.js?' + versions,
    'style': URL.css + 'materials.css?' + versions
  },
  map: {
    '*': {
      'css': '../lib/css'
    }
  },
  shim: {
    "ionic": {
      deps: ['css!' + URL.css + 'materials.css?' + versions,'jQuery'],
      exports: "ionic"
    },
    "ngCordova":{
      deps:["ionic"],
      exports:"ngCordova"
    },
    "mobiscroll":{
      deps:['jQuery',"ionic"],
      exports:"mobiscroll"
    },
    "config":{
      deps:["ionic"],
      exports:"config"
    },
    "s":{
      deps:["ionic"],
      exports:"s"
    },
    "f":{
      deps:["ionic"],
      exports:"f"
    },
    "d":{
      deps:["ionic"],
      exports:"d"
    },
    "c":{
      deps:["ionic"],
      exports:"c"
    },

    // "t":{
    //   deps:["ionic"],
    //   exports:"t"
    // },
    "app":{
      deps: ['ionic','mobiscroll',"ngCordova","config","f","s","d",'c'],
      exports:"app"
    }
    // "app": {
    //   deps: ["ngCordova",'mobiscroll'],
    //   exports: "app"
    // }
  }
});
require(['app'], function(a) {
  angular.bootstrap(document, ["materials"]);
});
