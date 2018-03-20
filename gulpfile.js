const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const autoprefixer = require("gulp-autoprefixer");




gulp.task("autoprefix", () =>
  gulp
    .src("src/css/main.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("dist"))
);
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
});
gulp.task('sass', function () {
    return gulp
      .src("src/scss/*.scss")
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.reload({ stream: true }));
});

gulp.task("images", function() {
  return gulp
    .src("src/img/**/*.+(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task("watch", ["browserSync", "sass"], function() {
  gulp.watch("src/scss/**/*.scss", ["sass"]);
  gulp.watch("src/*.html", browserSync.reload);
  gulp.watch("src/js/**/*.js", browserSync.reload); 
  // Other watchers
});