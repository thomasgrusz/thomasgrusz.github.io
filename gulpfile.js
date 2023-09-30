import { deleteSync } from 'del';
import gulp from 'gulp';
import cleanCss from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import cleanJs from 'gulp-terser';

// Function to delete /assets folder and index.html file at root
export async function clean() {
  return deleteSync(['./assets', './favicons', './index.html', './css', './js']);
}

// Function to copy the folder /src/assets to root
export function copyAssets() {
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./assets'));
}

// Function to copy the folder /src/favicons to root
export function copyFavicons() {
  return gulp.src('./src/favicons/**/*').pipe(gulp.dest('./favicons'));
}

// Function to minify /src/index.html file and save it at root
export function minifyHTML() {
  return gulp
    .src('./src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./'));
}

// Function to minify src/css/style.css and save it to /css/style.css
export function minifyCSS() {
  return gulp
    .src('./src/css/style.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('./css'));
}

// Function to minify all JavaScript files in ./src/js and save them in ./js
export function minifyJS() {
  return gulp.src('./src/js/*.js').pipe(cleanJs()).pipe(gulp.dest('./js'));
}

// Default task
export default gulp.series(clean, gulp.parallel(copyAssets, copyFavicons, minifyHTML, minifyCSS, minifyJS));