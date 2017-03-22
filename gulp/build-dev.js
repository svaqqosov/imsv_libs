
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
//var mainBowerFiles2 = require('gulp-main-bower-files');
//var mainBowerFiles = require('gulp-main-bower-files');

var concat = require('gulp-concat');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'uglify-save-license', 'del']
});


gulp.task('js', function () {
    gulp.src([
        path.join(conf.paths.src, '**/*.js')
    ]).pipe($.uglify())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/'))
    );
});

gulp.task('clean', function ()
{
    return $.del([path.join(conf.paths.dist, '/')]);
});

gulp.task('build:dev', ['js']);