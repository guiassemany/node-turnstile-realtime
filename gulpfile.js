(function() {
    'use strict';

    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        browserSync = require('browser-sync'),
        cssnano = require('gulp-cssnano'),
        notify = require('gulp-notify'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint'),
        templateCache = require('gulp-angular-templatecache'),
        wiredep = require('wiredep').stream;

    //For configuration
    var config = {
        sassPath: './src/assets/sass',
        sassWatch: ['./src/assets/sass/**/*.scss'],
        bowerDir: './src/bower_components',
        sassOutput: './src/assets/css',
        templates: ['./src/app/**/*.html'],
        javascripts: ['./src/app/app.module.js', './src/app/**/*.js']
    };

    //Compile sass
    gulp.task('sass', function() {
        return gulp.src(config.sassPath + '/style.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({
                    style: 'compressed',
                    includePaths: [
                        './assets/sass',
                        config.bowerDir + '/bootstrap-sass/assets/stylesheets/',
                    ]
                })
                .on("error", notify.onError(function(error) {
                    return "Error: " + error.message;
                })))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.sassOutput))
            .pipe(browserSync.stream());
    });

    //Inject bower dependencies into index.html
    gulp.task('wiredep', function() {
        gulp.src('./src/index.html')
            .pipe(wiredep())
            .pipe(gulp.dest('./src/'));
    });

    //Angular Template Cache
    gulp.task('template-cache', function() {
        return gulp.src(config.templates)
            .pipe(templateCache({
                module: 'nodeTurnstileRealtime'
            }))
            .pipe(gulp.dest('./src/assets/js'))
            .pipe(browserSync.stream());
    });

    //Javascripts
    gulp.task('javascripts', function() {
        return gulp.src(config.javascripts)
            .pipe(concat('app.js'))
            .pipe(jshint())
            .pipe(gulp.dest('./src/assets/js'))
            .pipe(browserSync.stream());
    });

    //Reload the main HTML page
    gulp.task('reload', function() {
        return gulp.src('./src/index.html')
            .pipe(browserSync.stream());
    });

    //BrowserSync Server
    gulp.task('serve', ['javascripts', 'wiredep', 'sass', 'template-cache'], function() {
        browserSync.init({
            server: "./src/"
        });
        gulp.watch([config.templates, './src/index.html'], ['template-cache']);
        gulp.watch(config.javascripts, ['javascripts']);
        gulp.watch(config.sassWatch, ['sass']);
        gulp.watch('./src/index.html', ['reload']);
    });

    gulp.task('default', ['serve']);

})();
