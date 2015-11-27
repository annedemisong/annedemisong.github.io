var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('clean', function(){
  return del(['public/dist/css', 'public/dist/js', 'public/dist/fonts']);
});

gulp.task('lint', function() {
  return gulp.src('src/js/**')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('move', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('lib-js', function(){
  return gulp.src(
      ['node_modules/react/dist/react.js',
       'node_modules/masonry-layout/dist/masonry.pkgd.js',
       'node_modules/imagesloaded/imagesloaded.pkgd.js'],
      {base : 'node_modules/'})
    .pipe(concat('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lib-css', function(){
  return gulp.src(
      ['node_modules/font-awesome/css/font-awesome.css',
       'node_modules/normalize.css/normalize.css'],
      {base: 'node_modules/'})
    .pipe(concat('lib.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('app-js', function(){
  return gulp.src([
    'src/js/photoLayout.js'
  ])
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('app-css', function(){
  return gulp.src('src/scss/app.scss')
    .pipe(sass())
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function(){
  gulp.watch('src/scss/**', ['app-css']);
  gulp.watch('src/js/**', ['app-js']);
});

gulp.task('default', ['move', 'lib-js', 'lib-css', 'app-js', 'app-css', 'watch']);
