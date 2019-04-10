var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('sass', function() {
  return gulp.src('_src/scss/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass', 'js'], function() {
  gulp.watch('_src/scss/**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('_src/js/**/*.js', browserSync.reload);
});

gulp.task('images', function(){
  return gulp.src('_src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('_src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('files', function() {
  return gulp.src('_src/files/**/*')
  .pipe(gulp.dest('dist/files'))
});

gulp.task('js', function() {
  return gulp.src('_src/js/**/*')
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'images', 'fonts', 'files', 'js'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['sass', 'images', 'fonts', 'files', 'js', 'browserSync', 'watch'],
    callback
  )
});

