'use strict'

 var   gulp = require('gulp'),
	 concat = require('gulp-concat'),
	 uglify = require('gulp-uglify'),
	 rename = require('gulp-rename'),
	   sass = require('gulp-sass'),
	   maps = require('gulp-sourcemaps'),
browserSync = require('browser-sync').create(),
	    del = require('del'),
 handlebars = require('gulp-handlebars'),
	   wrap = require('gulp-wrap'),
 	declare = require('gulp-declare'),
 	modernizr = require("modernizr");



gulp.task("concatScripts", function(){
	return gulp.src(['js/jquery.min.js',
		'js/jquery-migrate-1.2.1.min.js',
		'js/modernizr.js',
		'js/bootstrap.min.js',
		'js/main.js',
		'index.js',
		'js/filter.js'
		])
	.pipe(maps.init())
	.pipe(concat('app.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function(){
	return gulp.src("js/app.js")
	//.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task("compileSass", function(){
	return gulp.src("scss/application.scss")
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('watchFiles', ['browserSync'], function(){
	gulp.watch('scss/**/*.scss', ['compileSass']);
	gulp.watch('js/**/*.js', ['minifyScripts']);
	gulp.watch('index.html').on('change', browserSync.reload);
});



gulp.task("build", ["concatScripts", "compileSass", "watchFiles"],  function(){
	return gulp.src(["css/application.css", "js/app.min.js", "index.html", "index.js", "data/**", "img/**", "fonts/**"], {base: './'})
	.pipe(gulp.dest('dist'));
});


gulp.task("default", function(){
	gulp.start('build');
});




















