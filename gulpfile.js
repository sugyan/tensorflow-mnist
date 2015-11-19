var gulp = require("gulp");
var babelify = require("babelify");
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require("gulp-uglify");

gulp.task("build", () => {
    return browserify({ entries: ['./src/js/main.js'] })
        .transform(babelify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("static/js"));
});

gulp.task("watch", () => {
    gulp.watch("src/**/*.js", ["build"]);
});

gulp.task("default", ["build"]);
