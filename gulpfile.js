var gulp = require('gulp');
var webpack = require('gulp-webpack');
var foreach = require('gulp-foreach');
var gutil = require('gulp-util');
var minify = require('gulp-minify');
var fs = require('fs');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}
gutil.log(getFiles('components'));

gulp.task('default', function () {
    return gulp.src('js/*.js')
        .pipe(minify())
        .pipe(gulp.dest('dist'));
});