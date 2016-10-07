'use-strict';

var gulp = require('gulp'),
 sass = require('gulp-sass'),
 cssnano = require('gulp-cssnano'),
 uglify = require('gulp-uglify'),
 rename = require("gulp-rename"),
 concat = require('gulp-concat'),
 jsonminify = require('gulp-jsonminify'),
 handlebars = require('gulp-handlebars'),
 wrap = require('gulp-wrap'),
 declare = require('gulp-declare'),
 merge = require('merge-stream'),
 path = require('path'),
 useref = require('gulp-useref'),
 gulpIf = require('gulp-if'),
 browserSync = require('browser-sync').create();

//Process styles
gulp.task('sass', function() {
 gulp.src('src/scss/**/*.scss')
   //Convert sass to css
   .pipe(sass())
   //Minify css
   .pipe(cssnano())
   .pipe(rename({
     suffix: '.min'
   }))
   .pipe(gulp.dest('dist/css/'))
   //Inject css
   .pipe(browserSync.reload({
      stream: true
    }));
});

//Uglify js
gulp.task('useref', function(){
  return gulp.src('src/html/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist/html/'));
});


//Minify json file(s)
gulp.task('minifyjson', function() {
 return gulp.src(['src/data/*.json'])
   .pipe(jsonminify())
   .pipe(gulp.dest('dist/data/'));
});


//Compile handlebars templates and partials to dist/templates.js
gulp.task('templates', function() {
 // Assume all partials start with an underscore
 // You could also put them in a folder such as source/templates/partials/*.hbs
 var partials = gulp.src(['src/templates/partials/_*.handlebars'])
   .pipe(handlebars({
     handlebars: require('handlebars')
   }))
   .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
     imports: {
       processPartialName: function(fileName) {
         // Strip the extension and the underscore
         // Escape the output with JSON.stringify
         return JSON.stringify(path.basename(fileName, '.js').substr(1));
       }
     }
   }));

 var templates = gulp.src('src/templates/**/[^_]*.handlebars')
   .pipe(handlebars({
     handlebars: require('handlebars')
   }))
   .pipe(wrap('Handlebars.template(<%= contents %>)'))
   .pipe(declare({
     namespace: 'MyApp.templates',
     noRedeclare: true // Avoid duplicate declarations
   }));

 // Output both the partials and the templates as build/js/templates.js
 return merge(partials, templates)
   .pipe(concat('templates.js'))
   .pipe(gulp.dest('dist/js/'));
});

//Spin up local server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    startPath: 'html/'
  });
});

//Watch handlebars, html, json, scss, and js files for changes
gulp.task('watch', ['browserSync', 'sass', 'useref'], function() {
 gulp.watch(['src/templates/**/*.handlebars'], ['templates']);
 gulp.watch(['src/data/*json'], ['minifyjson']);
 gulp.watch('src/html/*.html', ['useref']).on('change', browserSync.reload);
 gulp.watch(['src/js/*.js'], ['useref']).on('change', browserSync.reload);
 gulp.watch(['src/scss/main.scss'], ['sass']);
});

//'gulp' in console runs the default task
gulp.task('default', ['watch']);
