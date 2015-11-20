var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('build', () => {
    return gulp.src('src/main.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('static/js'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['build']);
