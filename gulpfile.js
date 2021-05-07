'use strict';

var path = '';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    terser = require('gulp-terser'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    sass = require('gulp-dart-sass'),
    browserSync = require('browser-sync'),
    mmq = require('gulp-merge-media-queries');

gulp.task('css-assets', function () {
    return gulp.src([
        path + 'Css/Assets.scss',
    ])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 4 versions'))
        .pipe(mmq())
        .pipe(csso({
            restructure: false
        }))
        .pipe(rename('Assets.min.css'))
        .pipe(gulp.dest(path + 'Css'))
        .pipe(browserSync.reload({stream: true}))
});



gulp.task('js-assets', function () {

    return gulp.src([
        path + 'Js/Vendor/Lazysizes/plugins/bgset/ls.bgset.js',
        path + 'Js/Vendor/Lazysizes/lazysizes.js',
        path + 'Js/Vendor/pristine.js',
        path + 'Js/Vendor/cookie.js',
        path + 'Js/Vendor/Lightgallery/lightgallery.js',
        path + 'Js/Vendor/Lightgallery/lg-thumbnail.js',
        path + 'Js/Vendor/helpers.js',
        path + 'Js/Vendor/storageapi.js',
        path + 'Js/Vendor/dayjs.min.js',
        path + 'Js/Vendor/calendar.js',
        path + 'Js/Vendor/slider.js',
        path + 'Js/Vendor/aos.js',

        path + 'Js/Layout/*.js',
        path + 'Js/Assets/*.js',
        path + 'Js/Assets.js'

    ])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('Assets.min.js'))
        /*.pipe(terser({
            output: {
                comments: false
            }
        }))*/
        .pipe(gulp.dest(path + 'Js'))
        .pipe(browserSync.reload({stream: true}));

});

gulp.task('default', function () {

    browserSync.init({
        proxy: 'elements.local',
        host: 'elements.local',
        open: 'external'
    });

    gulp.watch(path + '*.html').on("change", function () {
        browserSync.reload()
    });

    gulp.watch([
        path + 'Css/Layout/*.scss',
        path + 'Css/Assets/*.scss',
        path + 'Css/Vendor/*.scss',
        path + 'Css/Assets.scss',
        path + 'Css/Normalize.scss',
        path + 'Css/Variables.scss',
    ], gulp.series('css-assets'));

    gulp.watch([
        path + 'Js/Assets/*.js',
        path + 'Js/Layout/*.js',
        path + 'Js/Vendor/*.js',
        path + 'Js/Assets.js',
        path + 'Js/Critical.js',
    ], gulp.series('js-assets'));


});
