const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
let cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const del = require('del');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();



const cssFiles = ['./src/css/styles.css', './src/css/animate.css'];

const jsFiles = [
  './src/js/jquery-3.4.1.min.js',
  './src/js/jquery.waypoints.min.js',
  './src/js/wow.min.js',
  './src/js/main.js'
];

const fontsToCopy = ['./src/css/HelveticaNeue-Thin.otf'];


// css task
function styles() {
  return gulp
      .src(cssFiles)
      // .pipe(sourcemaps.init())
      .pipe(concat('styles.css'))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ level: 2 }))
      // .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());
}

// scripts task
function scripts() {
  return gulp
    .src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(terser())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

// delete before write
function clean() {
  return Promise.resolve(del.sync('build/*'));
}

function copy() {
  return gulp.src(fontsToCopy).pipe(gulp.dest('./build/css'))
}

function images() {
  return gulp
    .src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./src/css/**/*.css', styles)
  gulp.watch('./src/js/**/*.js', scripts)
  gulp.watch('./src/img/**/*', images)
  gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('clean', clean);
gulp.task('copy', copy);
gulp.task('images', images);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', 
  gulp.series(
    clean,
    gulp.parallel(copy, images),
    gulp.parallel(styles, scripts)
    )
)

gulp.task('dev',
  gulp.series('build', 'watch')
)