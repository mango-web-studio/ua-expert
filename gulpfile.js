var gulp = require('gulp');
var sass  = require('gulp-sass');
var tinypng = require('gulp-tinypng-compress');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var fontName = 'myfont';


gulp.task('sass', function(){
	return gulp.src('scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(gulp.dest('css'))
});

gulp.task('tinypng', function () {
    gulp.src('img/**/*.{png,jpg,jpeg}')
	.pipe(tinypng({
		key: 'xMgdrYZJjl2bhB8jZ8LK5tWWQmGRkP2N',
		sigFile: 'images/.tinypng-sigs',
		log: true
	}))
	.pipe(gulp.dest('img/compressed'));
});


gulp.task('iconfont', function(){
	var runTimestamp = Math.round(Date.now()/1000);
	
	gulp.src(['img/svg/*.svg'])
	.pipe(iconfontCss({
	  fontName: fontName,
	  path: 'scss/templates/_icons.scss',
	  targetPath: '../../scss/_icons.scss',
	  fontPath: '../fonts/iconsfont/'
	}))
	// .pipe(gulp.dest('fonts/icons/'))
	.pipe(iconfont({
		fontName: fontName,
		startUnicode: false,
		prependUnicode: false,
		fontHeight: 1001,
		normalize: true,
		formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
	}))
	.pipe(gulp.dest('fonts/iconsfont/'));
});

gulp.task('sass-watch', function() {
	gulp.watch('scss/**/*.scss', ['sass'])
});