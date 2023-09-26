const gulp = require('gulp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');

// Function to delete /assets folder and index.html file at root
function clean() {
  return del(['./assets', './index.html']);
}

// Function to copy the folder /src/assets to root
function copyAssets() {
  // return gulp.src('./src/assets/**/*').pipe(gulp.dest('./'));
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./assets'));
}

// Function to minify /src/index.html file and save it at root
function minifyHtml() {
  return gulp
    .src('./src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./'));
}

// Function to run all tasks in series
function defaultTask(done) {
  gulp.series(clean, copyAssets, minifyHtml)(done);
}

// Export the individual functions
exports.clean = clean;
exports.copy = copyAssets;
exports.minifyHTML = minifyHtml;

// Export the default task
exports.default = defaultTask;
