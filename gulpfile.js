'use strict';

var changed = require('gulp-changed');
var childProcess = require('child_process');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var packageJson = require('./package.json');

var spawn = childProcess.spawn;
var server;

var PATHS = {
  lib: [
    'node_modules/angular/angular.js',
		'node_modules/angular-ui-router/release/angular-ui-router.js'
  ],
  client: {
    js: ['client/*.js','client/**/*.js'],
    html: 'client/**/*.html',
    css: ['client/**/*.css'],
    img: 'client/**/*.{svg,jpg,png,ico}'
  },
  dist: 'dist',
  distClient: 'dist/client',
  distLib: 'dist/lib',
  port: 8081
};

gulp.task('clean', function(done) {
  del([PATHS.dist], done);
});

gulp.task('libs', function() {
  return gulp
    .src(PATHS.lib)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(PATHS.distLib));
});

gulp.task('js', function() {
  return gulp
    .src(PATHS.client.js)
    .pipe(concat('app.js'))
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(gulp.dest(PATHS.distClient));
});

gulp.task('lint', function () { // https://github.com/palantir/tslint#supported-rules
	return gulp
		.src(PATHS.client.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('html', function() {
  return gulp
    .src(PATHS.client.html)
    .pipe(changed(PATHS.distClient))
    .pipe(gulp.dest(PATHS.distClient));
});

gulp.task('css', function() {
  return gulp
    .src(PATHS.client.css)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(PATHS.distClient));
});

gulp.task('img', function() {
  return gulp
    .src(PATHS.client.img)
    .pipe(changed(PATHS.distClient))
    .pipe(gulp.dest(PATHS.distClient));
});

gulp.task('bundle', function(done) {
  runSequence('clean', ['libs', 'lint', 'js', 'html', 'css', 'img'], done);
});

gulp.task('server:restart', function(done) {
  var started = false;
  if (server) {
    server.kill();
  }
  server = spawn('node', [packageJson.main]);
  server.stdout.on('data', function(data) {
    console.log(data.toString());
    if (started === false) {
      started = true;
      done();
    }
  });
  server.stderr.on('data', function(data) {
    console.error(data.toString());
  });
});

// clean up if an error goes unhandled.
process.on('exit', function() {
  if (server) {
    server.kill();
  }
});

gulp.task('start', ['bundle', 'server:restart'], function() {
  gulp.watch(PATHS.client.js, ['js']);
  gulp.watch(PATHS.client.html, ['html']);
  gulp.watch(PATHS.client.css, ['css']);
  gulp.watch(PATHS.client.img, ['img']);
  gulp.watch(packageJson.main, ['server:restart']);
});

gulp.task('default', ['bundle']);
