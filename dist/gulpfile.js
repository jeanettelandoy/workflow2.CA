

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
const imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('css', function(done) {
    gulp.src('./css/*.css')
    .pipe(uglifycss({
        "uglyComments": true
    }))
    .pipe(gulp.dest('./style/'));
    done();
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})
 
gulp.task('default', () =>
    gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./minified/images'))

        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
);

/*
gulp.task('run', ['sass', 'css']);

gulp.task('watch', function() {
    gulp.watch('.sass/*.scss', ['sass']);
    gulp.watch('.css/*.css', ['css']);
});
gulp.task('default', ['run', 'watch'])*/