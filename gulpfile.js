'use-strict';

var gulp = require('gulp'),
 sass = require('gulp-sass'),
 cssnano = require('gulp-cssnano'),
 uglify = require('gulp-uglify'),
 rename = require("gulp-rename"),
 concat = require('gulp-concat'),
 htmlmin = require('gulp-htmlmin'),
 jsonminify = require('gulp-jsonminify'),
 connect = require('gulp-connect'),
 open = require('gulp-open'),
 handlebars = require('gulp-handlebars'),
 wrap = require('gulp-wrap'),
 declare = require('gulp-declare'),
 merge = require('merge-stream'),
 path = require('path'),
 useref = require('gulp-useref'),
 uglify = require('gulp-uglify'),
 gulpIf = require('gulp-if');

//Convert scss to css
gulp.task('sass', function() {
 gulp.src('src/scss/*.scss')
   .pipe(sass())
   .pipe(gulp.dest('dist/css/'));
});
//Minify css
gulp.task('compresscss', function() {
 gulp.src('dist/css/main.css')
   .pipe(cssnano())
   .pipe(rename({
     suffix: '.min'
   }))
   .pipe(gulp.dest('dist/css/'));
});

//Concat and uglify js
gulp.task('useref', function(){
  return gulp.src('src/html/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist/html/'));
});


//Minify json files
gulp.task('minifyjson', function() {
 return gulp.src(['src/data/*.json'])
   .pipe(jsonminify())
   .pipe(gulp.dest('dist/data/'));
});
//Set up local server and open in default browser
gulp.task('connect', function() {
 connect.server({
   port: 8080,
 });
});
gulp.task('open', function() {
 gulp.src(__filename)
   .pipe(open({
     uri: 'http://localhost:8080/dist/html/'
   }));
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

//Watch handlebars, html, scss, css and js files for changes
gulp.task('watch', function() {
 gulp.watch(['src/templates/**/*.handlebars'], ['templates']);
 gulp.watch(['src/data/*json'], ['minifyjson']);
 gulp.watch(['src/html/*.html'], ['minifyhtml']);
 gulp.watch(['src/scss/main.scss'], ['sass']);
 gulp.watch(['dist/css/main.css'], ['compresscss']);
 gulp.watch(['src/js/*.js'], ['useref']);
});

gulp.task('default', ['watch', 'connect', 'open']);
