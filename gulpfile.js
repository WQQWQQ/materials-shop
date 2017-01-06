var gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  sequence = require('gulp-sequence'),
  watch = require('gulp-watch'),
  concatCSS = require('gulp-concat-css'),
  imagemin = require('gulp-imagemin'),
  gulpif = require("gulp-if"),
  rename = require('gulp-rename'),
  templateCache = require('gulp-angular-templatecache'),


  role = 'materials',
  // role='florist',
  // role='wholesal,',
  // role='producer',
  // role='supplier',

  tplSrc = 'dev/templates/**/*.html',
  tplDest = 'dev/js/',
  sassSrc = 'dev/sass/style.scss',
  imgSrc = 'dev/img/*',
  imgDest = 'www/img',
  cssSrc = 'dev/css/',
  cssDest = 'dev/assets/',
  jsSrc = 'dev/js/',
  jsDest = 'dev/assets/';
// gulp.task('s-sprites', function() {
//  return gulp.src('dev/supplier/img/icon/*.png')
//    .pipe(tasks.spritesmith({
//      imgName: 'supplierIcon.png',
//      styleName: 'supplierIcon.css',
//      imgPath: '../img/supplierIcon.png'
//    }))
//    .pipe(gulpif('*.png', gulp.dest('dev/supplier/img/')))
//    .pipe(gulpif('*.css', gulp.dest('dev/supplier/css/')));
// });

gulp.task('angularTplCache', function() {
  return gulp.src(tplSrc)
    .pipe(templateCache('templates.js',{
      root:"templates/",
      templateHeader :'app.run(["$templateCache", function($templateCache) {'
    }))
    .pipe(gulp.dest(tplDest));
});

gulp.task('imgmin', function() {
  return gulp.src(imgSrc)
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest))
});

gulp.task('sass', function() {
  return gulp.src(sassSrc)
    .pipe(sass())
    .pipe(gulp.dest(cssSrc));
});

gulp.task('autoprefix', function() {
  return gulp.src(cssSrc + 'style.css')
    .pipe(prefixer({
      cascade: false
    }))
    .pipe(gulp.dest(cssSrc));
});

// gulp.task('concatcss', function() {
//   return gulp.src([cssSrc + '*.css', '!' + cssSrc + role + '.css'])
//     .pipe(concatCSS(role + ".css"))
//     .pipe(gulp.dest(cssSrc));
// });

gulp.task('cleancss', function() {
  return gulp.src(cssSrc + role + '.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(cssDest));
});

gulp.task('concatjs', function() {
  return gulp.src([jsSrc+'configs.js',jsSrc+'services.js',jsSrc+'filters.js',jsSrc+'directives.js',jsSrc+'controllers.js',jsSrc+'app.js',jsSrc+'templates.js'])
    .pipe(concat(role + '.js'))
    .pipe(gulp.dest(jsSrc));
});

gulp.task('jsmin', function() {
  gulp.src(jsSrc + role + '.js')
    .pipe(uglify({
      mangle: {
        except: ['app']
      }
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(jsDest));

  gulp.src(jsDest + 'index.min.js')
    .pipe(uglify({
      mangle: {
        except: ['require', 'exports', 'module', '$']
      }
    }))
    .pipe(gulp.dest(jsDest));
});

// gulp.task('rev', function () {
//     return gulp.src('dev/'+role+'/*.css')
//         .pipe(rev())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('processCSS', function(cb) {
  sequence(['sass'], ['autoprefix'], ['concatcss'], cb);
});
gulp.task('watch', ['processCSS'], function() {
  gulp.watch(sassSrc, ['processCSS']);
});
gulp.task("default", function(cb) {
  sequence(['sass', 'angularTplCache'], ['concatjs', 'autoprefix'], ['cleancss', 'jsmin'], cb);
});
