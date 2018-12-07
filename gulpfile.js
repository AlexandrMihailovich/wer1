'use strict';


var gulp       = require('gulp'),
//
    //sass       = require('gulp-sass'),
    //sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename');


//gulp.task('default', ['compressed-js', 'compressed-js:watch']);

// JS COMPRESSED
gulp.task('compressed-js', function () {
    gulp.src('js/src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js'));
});

gulp.task('compressed-js:watch', function () {
    gulp.watch('./js/src/*.js', ['compressed-js']);
});