var gulp = require('gulp');
var babel = require('gulp-babel');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var build = "app/build";
var src = "src";

var html = {
    source: src + "/index.html",
    destination: build
};

var scripts = {
    index: src + "/index.jsx",
    bundle: "index.js",
    destination: build + "/static"
};

var styles = {
    source: src + "/style.styl",
    bundle: "style.css",
    destination: build + "/static"
};

var assets = {
    source: src + "/assets/**/*.*",
    destination: build + "/assets"
};

var libs = {
    source: [
        //'./node_modules/jquery/dist/jquery.js',
        //'./node_modules/underscore/underscore.js',
        //'./node_modules/backbone/backbone.js'
    ],
    destination: build + "/lib"
};

gulp.task('html', function() {
    gulp.src(html.source).pipe(gulp.dest(html.destination));
});

gulp.task('scripts', function() {
    browserify({
        entries: [scripts.index],
        extensions: ['.jsx']
    })
        .transform(babelify)
        .bundle()
        .pipe(source(scripts.bundle))
        .pipe(gulp.dest(scripts.destination));
});

gulp.task('styles', function() {
    gulp.src(styles.source)
        .pipe(stylus())
        .pipe(concat(styles.bundle))
        .pipe(gulp.dest(styles.destination));
});

gulp.task('assets', function() {
    gulp.src(assets.source).pipe(gulp.dest(assets.destination));
});

gulp.task('libs', function() {
    gulp.src(libs.source).pipe(gulp.dest(libs.destination));
});

gulp.task('default', ['scripts', 'html', 'styles', 'libs', 'assets']);