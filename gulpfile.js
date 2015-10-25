var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass');

var config = {
  srcCss: './src/scss/*.scss',
  srcJS: './src/js/*.js',
  destCss: './app/css',
  destJS: './app/js'
};

gulp.task('default', ['compile-sass', 'minify-js', 'watch']);

gulp.task('compile-sass', function () {
  gulp.src(config.srcCss)
  .pipe(concat('bundle.css'))
  .pipe(sass())
  .pipe(gulp.dest(config.destCss));
});

gulp.task('minify-js', function () {
  gulp.src(config.srcJS)
  .pipe(concat('bundle.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.destJS))
});

gulp.task('watch', function () {
  gulp.watch(config.srcJS, ['minify-js']);
  gulp.watch(config.srcCss, ['compile-sass']);
});