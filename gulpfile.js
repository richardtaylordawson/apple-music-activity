const gulp = require("gulp")
const dartSass = require("sass")
const gulpSass = require("gulp-sass")
const browserSync = require("browser-sync").create()
const del = require("del")
const cleanCSS = require("gulp-clean-css")
const uglify = require("gulp-uglify")
const htmlmin = require("gulp-htmlmin")
const rollup = require("gulp-better-rollup")
const babel = require("rollup-plugin-babel")

const sass = gulpSass(dartSass)

gulp.task("images", () =>
  gulp
    .src("_src/images/**/*.+(png|jpg|jpeg|gif|svg|ico)")
    .pipe(gulp.dest("dist/images"))
)

gulp.task("rootIcons", () =>
  gulp.src("_src/apple-touch-icon.png").pipe(gulp.dest("dist"))
)

gulp.task("statsJs", () =>
  gulp
    .src("_src/js/stats.js", { allowEmpty: true })
    .pipe(rollup({ plugins: [babel()] }, { format: "cjs" }))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
)

gulp.task("appJs", () =>
  gulp
    .src("_src/js/app.js")
    .pipe(rollup({ plugins: [babel()] }, { format: "cjs" }))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({ stream: true }))
)

gulp.task("js", gulp.series("statsJs", "appJs"))

gulp.task("scss", () => {
  return gulp
    .src("_src/scss/index.scss")
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task("html", () =>
  gulp
    .src("_src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }))
)

gulp.task("altFiles", () =>
  gulp.src("_src/**/*.+(json|txt|xml)").pipe(gulp.dest("dist/"))
)

gulp.task("fonts", function () {
  return gulp.src("_src/fonts/**/*").pipe(gulp.dest("dist/fonts"))
})

gulp.task("files", function () {
  return gulp.src("_src/files/**/*").pipe(gulp.dest("dist/files"))
})

gulp.task("syncDist", (done) => {
  del.sync("dist")
  done()
})

gulp.task("browserSync", () =>
  browserSync.init({ server: { baseDir: "./dist" } })
)

gulp.task("watch", () => {
  gulp.watch("_src/images/**/*.+(png|jpg|jpeg|gif|svg)", gulp.series("images"))
  gulp.watch("_src/apple-touch-icon.png", gulp.series("rootIcons"))
  gulp.watch("_src/js/**/*.js", gulp.series("js"))
  gulp.watch("_src/scss/**/*.scss", gulp.series("scss"))
  gulp.watch("_src/**/*.html", gulp.series("html"))
  gulp.watch("_src/**/*.+(json|txt|xml)", gulp.series("altFiles"))
  gulp.watch("_src/fonts/**/*", gulp.series("fonts"))
  gulp.watch("_src/files/**/*", gulp.series("files"))
})

gulp.task(
  "build",
  gulp.series(
    "syncDist",
    gulp.parallel("images", "rootIcons", "js", "scss", "html", "altFiles", "fonts", "files")
  )
)

gulp.task(
  "default",
  gulp.series(
    "syncDist",
    gulp.parallel("images", "rootIcons", "js", "scss", "html", "altFiles", "fonts", "files"),
    gulp.parallel("browserSync", "watch")
  )
)
