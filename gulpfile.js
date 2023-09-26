const gulp = require('gulp');
const { rimraf } = require('rimraf');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const cleanJS = require('gulp-terser');

// Function to delete /assets folder and index.html file at root
function clean() {
  return rimraf(['./assets', './favicons', './index.html', './css']);
}

// Function to copy the folder /src/assets to root
function copyAssets() {
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./assets'));
}

// Function to copy the folder /src/favicons to root
function copyFavicons() {
  return gulp.src('./src/favicons/**/*').pipe(gulp.dest('./favicons'));
}

// Function to minify /src/index.html file and save it at root
function minifyHtml() {
  return gulp
    .src('./src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./'));
}

// Function to minify src/css/style.css and save it to /css/style.css
function minifyCss() {
  return gulp
    .src('./src/css/style.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./css'));
}

// Function to minify all JavaScript files in ./src/js and save them in ./js
function minifyJs() {
  return gulp.src('./src/js/*.js').pipe(cleanJS()).pipe(gulp.dest('./js'));
}

// Function to run all tasks in series
function defaultTask(done) {
  gulp.series(
    clean,
    copyAssets,
    copyFavicons,
    minifyHtml,
    minifyCss,
    minifyJs
  )(done);
}

// Export the individual functions
exports.clean = clean;
exports.copyAssets = copyAssets;
exports.copyFavicons = copyFavicons;
exports.minifyHTML = minifyHtml;
exports.minifyCSS = minifyCss;
exports.minifyJS = minifyJs;

// Export the default task
exports.default = defaultTask;
