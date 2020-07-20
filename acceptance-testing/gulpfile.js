const gulp = require('gulp')
const run = require('gulp-run-command').default
const del = require('del')

gulp.task('wdiotest', run('wdio wdio.conf.js'))
gulp.task('allure-report', run('allure generate ./allure-results && allure open'))
gulp.task('cleanReports', ()=>{
    return del(['./allure-results','./allure-report'])
})

gulp.task('gulptest', gulp.series('cleanReports','wdiotest','allure-report'))
