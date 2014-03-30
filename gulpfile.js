var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// convert our markdown to html
gulp.task('markdown', function () {
    return gulp.src('*.md')
        .pipe($.marked())
        .pipe(gulp.dest('pre-build/'))
});

// include all HTML files from prebuild into our site menu
gulp.task('index', function () {
    return gulp.src('pre-build/*.html')
        .pipe($.staticSite('template.jade'))
        .pipe(gulp.dest('build/'))
        .pipe($.size());
});

// process our stylesheet
gulp.task('sass', function(){
    return gulp.src('style.scss')
        .pipe($.rubySass())
        .pipe(gulp.dest('build/css/'));
});

// cleanup
gulp.task('clean', function () {
    return gulp.src(['build/', 'pre-build/'], {read: false})
        .pipe($.clean());
});

gulp.task('default', ['clean', 'sass', 'markdown'], function () {
        gulp.start('index');
});
