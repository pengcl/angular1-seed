var gulp = require('gulp');
var compass = require( 'gulp-for-compass' );
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint=require('gulp-jshint');
var version = "1.0.0";


//sass合并,压缩
gulp.task('sass', function(){
    return gulp.src('sass/*.scss')
        .pipe(compass({
            sassDir: 'sass',
            cssDir: 'css',
            force: true
        }));
});

//语法检查
gulp.task('jshint', function () {
    return gulp.src('app/partials/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//合并,压缩 controllers
gulp.task('controllers', function() {
    return gulp.src('app/partials/**/*.js')      //需要操作的文件
        .pipe(concat('controllers.js'))    //合并所有js到main.js
        .pipe(gulp.dest('app/components/' + version + '/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('app/components/' + version + '/'));  //输出
});

//合并,压缩 directives
gulp.task('directives', function() {
    return gulp.src('app/modules/**/*.js')      //需要操作的文件
        .pipe(concat('directives.js'))    //合并所有js到main.js
        .pipe(gulp.dest('app/components/' + version + '/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('app/components/' + version + '/'));  //输出
});

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    gulp.start('sass','jshint','controllers','directives');
});