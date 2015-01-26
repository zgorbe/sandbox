'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

/**
 * Some constants to save some typing later
 */
var generatedPath = 'src/main/webapp/generated/',
	resourcesPath  = 'src/main/webapp/frontend/';

gulp.task('styles', function () {
    return gulp.src(resourcesPath + '/**/*.scss')
    .pipe($.concat('styles/application.scss'))
    .pipe($.sass())
    .pipe(gulp.dest(generatedPath));
});

gulp.task('scripts', function () {
    return gulp.src(resourcesPath + '/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
//        .pipe($.jshint.reporter('fail'))  // uncomment to make the build fail when their is a warning
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest(generatedPath));
});

/**
 * The clean task.
 */
gulp.task('clean', function () {
    return gulp.src(generatedPath, { read: false })
        .pipe($.clean());
});

/**
 * The build task just executes 'styles' and 'scripts' tasks
 */
gulp.task('build', ['styles', 'scripts']);

/**
 * Executing just 'gulp' will execute 'clean' and start 'build' tasks
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

/**
 * Watch for modifications in Sass and JavaScript resources and
 * recompile/jshint them
 * Usage: $ gulp watch
 */
gulp.task('watch', function () {
    gulp.watch(resourcesPath + '**/*.scss', ['styles']);
    gulp.watch(resourcesPath + '**/*.js', ['scripts']);
});