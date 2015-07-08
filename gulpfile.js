/*
Gulpfile.js file for the tutorial:
Using Gulp, SASS and Browser-Sync for your front end web development - DESIGNfromWITHIN
http://designfromwithin.com/blog/gulp-sass-browser-sync-front-end-dev

Steps:

1. Install gulp globally:
npm install --global gulp

2. Type the following after navigating in your project folder:
npm install gulp gulp-util gulp-sass gulp-uglify gulp-rename gulp-minify-css gulp-notify gulp-concat gulp-plumber browser-sync --save-dev

3. Move this file in your project folder

4. Setup your vhosts or just use static server (see 'Prepare Browser-sync for localhost' below)

5. Type 'Gulp' and ster developing
*/

/* Needed gulp config */
var gulp = require('gulp');  
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var neat = require('node-neat').includePaths;
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/* Setup scss path */
var paths = {
	scss: 'src/scss/*.scss'
};

gulp.task('scripts', function() {
  return gulp.src([
		// combined in order:
		'src/js/app.js',
		'src/js/call-to-action.js',
		'src/js/contact.js',
		'src/js/modal.js'

	])
	.pipe(concat('scripts.js'))
	// .pipe(gulp.dest('app/assets/js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/assets/js'));
});

/* Sass task */
gulp.task('sass', function () {   
	gulp.src('src/scss/style.scss')
	.pipe(plumber())
	.pipe(sass({
		includePaths: ['src/scss'].concat(neat)
	}))
	.pipe(sass({sourcemap: true}))
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(autoprefixer({
		browsers: ['IE 8', 'IE 9', 'last 5 versions', 'Firefox 14', 'Opera 11.1']
   }))
   .pipe(sourcemaps.write())
	.pipe(gulp.dest('app/assets/css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('app/assets/css'))
	.pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['sass', 'browser-sync'], function () {
	/* Watch scss, run the sass task on change. */
	gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass'])

	/* Watch all src/js/*.js files, run the scripts task on change. */
	gulp.watch(['src/js/*.js'], ['scripts'])

	/* Watch .html files, run the bs-reload task on change. */
	gulp.watch(['app/*.html'], ['bs-reload']);
});






















