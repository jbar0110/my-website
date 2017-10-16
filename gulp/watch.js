const gulp        = require('gulp'),
      watch       = require('gulp-watch'),
      browserSync = require('browser-sync').create();

      fallback = require('connect-history-api-fallback'),
      log      = require('connect-logger');

gulp.task('default', function () {
    gulp.start('watch');
})

gulp.task('cssInject', ['css'], function () {
    return gulp.src('./docs/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function () {
    browserSync.reload();
})

gulp.task('watch', ['scripts', 'css'], function () {
    browserSync.init({
        notify : false,
        port   : 8888,
        server : {
            baseDir: 'docs'
        },
        middleware: [
            log({ format: '%date %status %method %url' }),
            fallback({
                index: '/index.html',
                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
            })
        ]
    });
    watch('./app/css/**/*.css', function () {
        gulp.start('cssInject');
    });
    watch('./app/js/**/*.js', function () {
        gulp.start('scriptsRefresh');
    })
    watch('./docs/**/*.html', function () {
        browserSync.reload();
    });
});
