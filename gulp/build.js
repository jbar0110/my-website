const
    gulp   = require('gulp'),
    del    = require('del'),
    usemin = require('gulp-usemin'),
    rev    = require('gulp-rev'),
    nano   = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    bs     = require('browser-sync').create();

gulp.task('build', [
    'cleanDist',
    'useminTrigger',
    'copyTwitchImage'
]);

gulp.task('cleanDist', () => del(['./docs']))

gulp.task('copyTwitchImage', ['cleanDist'], () => {
    return gulp.src('./app/assets/img/twitch-logo.png')
        .pipe(gulp.dest('./docs/assets/img'))
})

gulp.task('useminTrigger', ['cleanDist'], () => gulp.start('optimizeStaticFiles'))

gulp.task('optimizeStaticFiles', ['css', 'scripts'], () => {
    return gulp.src(['./app/index.html'])
        .pipe(
            usemin({
                css : [rev, nano],
                js  : [rev, uglify]
            })
        )
        .pipe(gulp.dest('./docs'))
})

gulp.task('distView', () => {
    bs.init({
        notify: false,
        server: {
            baseDir: 'docs'
        }
    });
})