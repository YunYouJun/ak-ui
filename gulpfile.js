const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const del = require("del");

sass.compiler = require("sass");

const dir = {
  dist: "dist",
  scss: "src/scss",
  vuepress: "docs/.vuepress/public/css"
};

const sassOptions = {
  outputStyle: "expanded"
};

function clean() {
  return del([dir.dist, dir.vuepress]);
}

function scss() {
  return gulp
    .src(dir.scss + "/ak-ui.scss")
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(gulp.dest(dir.dist))
    .pipe(
      cleanCSS({ debug: true }, details => {
        console.log(`${details.name}: ${details.stats.originalSize} B`);
        console.log(`${details.name}: ${details.stats.minifiedSize} B`);
      })
    )
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(dir.dist))
    .pipe(gulp.dest(dir.vuepress));
}

function watch() {
  gulp.watch(dir.scss + "/**/*.scss", scss);
}

const build = gulp.series(clean, scss);

exports.clean = clean;
exports.scss = scss;
exports.watch = watch;
exports.build = build;
// default
exports.default = build;
