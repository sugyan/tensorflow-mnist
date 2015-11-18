var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("babel", () => {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("static"));
});

gulp.task("watch", () => {
   gulp.watch("src/**/*.js", ["default"]);
});

gulp.task("default", ["babel"]);
