var gulp = require('gulp');
var compass = require('gulp-for-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var version = "1.0.0";


//sass合并,压缩
gulp.task('sass', function () {
    return gulp.src('sass/**/*.scss')
        .pipe(compass({
            sassDir: 'sass',
            cssDir: 'public/css',
            force: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/'));
});

//语法检查
gulp.task('jshint', function () {
    return gulp.src(['public/js/**/*.js', 'public/html/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//合并,压缩 angular
gulp.task('angular', function () {
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
});

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
    gulp.watch(['public/js/**/*.js', 'public/html/**/*.js'], ['jshint', 'public']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start('sass', 'jshint', 'angular', 'public', 'watch');
});