var gulp = require('gulp')

var $ = {
  rimraf: require('gulp-rimraf'),
  markdown: require('gulp-markdown'),
  sass: require('gulp-sass'),
  size: require('gulp-size'),
  staticSite: require('gulp-static-site')
}

// convert our markdown to html
gulp.task('markdown', function () {
  return gulp.src('content/*.md')
    .pipe($.markdown())
    .pipe(gulp.dest('pre-build/'))
})

// include all HTML files from prebuild into our site menu
gulp.task('index', function () {
  return gulp.src('pre-build/*.html')
    .pipe($.staticSite('template.jade'))
    .pipe(gulp.dest('build/'))
    .pipe($.size())
})

// process our stylesheet
gulp.task('sass', function () {
  return gulp.src('style.scss')
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe(gulp.dest('build/css/'))
})

// cleanup
gulp.task('clean', function () {
  return gulp.src(['build/**/*', 'pre-build/**/*'], {read: false})
    .pipe($.rimraf())
})

gulp.task('default', ['clean', 'sass', 'markdown'], function () {
  gulp.start('index')
})
