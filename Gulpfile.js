var gulp = require('gulp'),
    importCss = require('gulp-import-css'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    amdOptimize = require('amd-optimize');
var urlLib='./node_modules/';

var path={
  js:{
      src:[urlLib+'/jquery/dist/jquery.min.js',urlLib+'jquery-mousewheel/jquery.mousewheel.js',urlLib+'metro-ui/build/js/metro.min.js']
  }  
};
onError = function (err) {
    console.log(err);
};
gulp.task('default', function () {
    gulp.src('assets/*.css')
        .pipe(importCss())
        .pipe(gulp.dest('public/stylesheets/'));
    gulp.src(path.js.src)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('images', function () {
    var imgSrc = 'node_modules/metro-ui/docs/images/*',
        imgDst = 'public/images';

    return gulp.src(imgSrc)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
        .pipe(notify({message: 'Images task complete'}));
});
