
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('editor', function () {
    return gulp.src(
        [
            path.join(conf.paths.src, 'threejs/*.js'),
            path.join(conf.paths.src, 'OrbitControls.js'),
            path.join(conf.paths.src, 'L.Path.Transform-src.js'),
            path.join(conf.paths.src, 'ng-sortable.js'),
            path.join(conf.paths.src, 'semicircle.js'),
            path.join(conf.paths.src, 'socket.io.js')

        ])
        .pipe($.concat('editor_libs.js'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/'))
            .on('end',function(){
                gulp.src(path.join(conf.paths.dist, 'editor_libs.js'))
                    .pipe($.uglify())
                    .pipe($.concat('editor_libs.min.js'))
                    .pipe(gulp.dest(path.join(conf.paths.dist, '/'))
                );
            })
    );

});

gulp.task('viewer', function () {
    return gulp.src(
        [
            path.join(conf.paths.src, 'threejs/*.js'),
            path.join(conf.paths.src, 'tween.js'),
            path.join(conf.paths.src, 'OrbitControls.js'),
            path.join(conf.paths.src, 'socket.io.js')
        ])
        .pipe($.concat('viewer_libs.js'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/'))
            .on('end',function(){
                gulp.src(path.join(conf.paths.dist, 'viewer_libs.js'))
                    .pipe($.uglify())
                    .pipe($.concat('viewer_libs.min.js'))
                    .pipe(gulp.dest(path.join(conf.paths.dist, '/'))
                );
            })
    );

});


gulp.task('all', function () {
    return gulp.src(
        [
            path.join(conf.paths.src, 'threejs/*.js'),
            path.join(conf.paths.src, 'tween.js'),
            path.join(conf.paths.src, 'OrbitControls.js'),
            path.join(conf.paths.src, 'ng-sortable.js'),
            path.join(conf.paths.src, 'semicircle.js'),
            path.join(conf.paths.src, 'socket.io.js'),
            path.join(conf.paths.src, 'L.Path.Transform-src.js')

        ])
        .pipe($.concat('imsv_libs.js'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/'))
            .on('end',function(){
                gulp.src(
                    [
                        path.join(conf.paths.src, 'threejs/*.js'),
                        path.join(conf.paths.src, '**/*.js')

                    ])
                    .pipe($.uglify())
                    .pipe($.concat('imsv_libs.min.js'))
                    .pipe(gulp.dest(path.join(conf.paths.dist, '/'))
                );
            })
    );
});

gulp.task('clean', function ()
{
    return $.del([path.join(conf.paths.dist, '/')]);
});

gulp.task('build', ['all','editor','viewer']);