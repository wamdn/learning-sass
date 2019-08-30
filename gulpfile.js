const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
   return gulp.src('./src/scss/**/*.{scss,sass}', {sourcemaps: true})
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css/'), {sourcemaps: '.'})
      .pipe(browserSync.stream());
}

function html() {
   return gulp.src('./src/*.html')
      .pipe(gulp.dest('./dist/'))
      .pipe(browserSync.stream());
}

function watch() {
   browserSync.init({
      server: {
          baseDir: "./dist/"
      }
  });
  gulp.watch('./src/scss/**/*.{scss,sass}', style);
  gulp.watch('./src/*.html', html);
  gulp.watch(['./dist/css/*.css', './dist/*.html']).on('change', browserSync.reload);
}

module.exports = {
   style,
   html,
   watch,
   default: gulp.series( gulp.parallel(style, html), watch)
}