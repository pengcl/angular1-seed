var gulp = require('gulp');
var compass = require('gulp-for-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var version = "1.0.3";

gulp.task('public', function () {
    return gulp.src(['public/js/**/*.js', 'public/html/**/*.js'])      //需要操作的文件
        .pipe(concat('public.js'))    //合并所有js到public.js
        .pipe(gulp.dest('public/components/' + version + '/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('public/components/' + version + '/'));  //输出
});

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
gulp.task('sass', function () {
    return gulp.src('sass/**/*.scss')
        .pipe(compass({
            sassDir: 'sass',
            cssDir: 'public/css/' + version + '/',
            force: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest(version + '/'));
});

gulp.task('spc', function () {
    return gulp.src('public/spc/sass/*.scss')
        .pipe(compass({
            sassDir: 'public/spc/sass/',
            cssDir: 'public/spc/',
            force: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/spc/min/'));
});

gulp.task('watch', function () {
    gulp.watch([['public/js/**/*.js', 'public/html/**/*.js'], 'public/html/**/*.html', 'sass/**/*.scss'], ['public', 'html2js', 'sass']);
    gulp.watch(['public/spc/sass/*.scss'], ['spc']);
});

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start('public', 'html2js', 'sass', 'spc', 'watch');
});