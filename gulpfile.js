var gulp = require('gulp');
//var compass = require('gulp-for-compass');
var concat = require('gulp-concat');  //文件合并
var uglify = require('gulp-uglify');  //js文件压缩
var rename = require('gulp-rename');  //重命名
var jshint = require('gulp-jshint');  //js代码检查
var minifyCSS = require('gulp-minify-css');  //css文件压缩
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html"); //html文件压缩
var version = "1.0.3";


gulp.task('html2js', function () {
    return gulp.src("public/html/**/*.html")
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: "appTemplates"
        }))
        .pipe(concat("template.tpl.js"))
        .pipe(uglify())
        .pipe(gulp.dest('public/components/' + version + '/'));
});
//sass合并,压缩


//语法检查
gulp.task('jshint', function () {
    return gulp.src(['public/js/**/*.js', 'public/html/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//合并,压缩 angular
/*gulp.task('angular', function () {
 return gulp.src([
 'public/bower_components/angular/angular.min.js',
 'public/bower_components/ui-route/release/angular-ui-router.min.js',
 'public/bower_components/angular-animate/angular-animate.min.js',
 'public/bower_components/ui-route/angular-cookies.min.js'])      //需要操作的文件
 .pipe(concat('angular-all.js'))    //合并所有angular到angular-all.js
 .pipe(gulp.dest('public/components/angular/'))       //输出到文件夹
 .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
 .pipe(uglify())    //压缩
 .pipe(gulp.dest('public/components/angular/'));  //输出
 });*/

//合并,压缩 app、controllers、Directives、filters
gulp.task('public', function () {
    return gulp.src(['public/js/**/*.js', 'public/html/**/*.js'])      //需要操作的文件
        .pipe(concat('public.js'))    //合并所有js到public.js
        .pipe(gulp.dest('public/components/' + version + '/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('public/components/' + version + '/'));  //输出
});

gulp.task('watch', function () {
    gulp.watch(['public/js/**/*.js', 'public/html/**/*.js', 'public/html/**/*.html'], [/*'jshint', */'public', 'html2js']);
   // gulp.watch(['sass/**/*.scss', 'public/spc/sass/*.scss'], ['sass', 'spc']);
});

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start(/*'sass', 'spc',*/ /*'jshint', */'public', 'html2js', 'watch');
});