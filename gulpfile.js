var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/assets/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('watch', function() {
  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/assets/js/**/*.js', browserSync.reload);
})

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/assets/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('icons', function() {
  return gulp.src('node_modules/@frntawesome/fontawesome-free/webfonts/*')
      .pipe(gulp.dest(dist+'/app/fonts/'));
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts', 'icons'],
    callback
  )
})
