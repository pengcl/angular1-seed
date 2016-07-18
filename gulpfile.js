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
            cssDir: 'app/css',
            force: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/'));
});

//语法检查
gulp.task('jshint', function () {
    return gulp.src(['app/js/**/*.js', 'app/html/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//合并,压缩 app、controllers、Directives、filters
gulp.task('app', function () {
    return gulp.src(['app/js/**/*.js', 'app/html/**/*.js'])      //需要操作的文件
        .pipe(concat('app.js'))    //合并所有js到app.js
        .pipe(gulp.dest('app/components/' + version + '/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('app/components/' + version + '/'));  //输出
});

gulp.task('watch', function () {
    gulp.watch(['app/js/**/*.js', 'app/html/**/*.js'], ['jshint', 'app']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start('sass', 'jshint', 'app', 'watch');
});