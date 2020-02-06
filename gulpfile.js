var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    tinypng      = require('gulp-tinypng-compress'),
    iconfont     = require('gulp-iconfont'),
    iconfontCss  = require('gulp-iconfont-css'),
    fontName     = 'myfont',
	browserSync  = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function(){
	return gulp.src('scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false
	});
});

gulp.task('tinypng', function() {
    gulp.src('img/**/*.{png,jpg,jpeg}')
	.pipe(tinypng({
		key: 'xMgdrYZJjl2bhB8jZ8LK5tWWQmGRkP2N',
		sigFile: 'img/.tinypng-sigs',
		sameDest: true,
		log: true,
		summarize: true
	}))
	.pipe(gulp.dest('img'));
});

gulp.task('iconfont', function(){
	// var runTimestamp = Math.round(Date.now()/1000);
	
	gulp.src(['img/svg/*.svg'])
	.pipe(iconfontCss({
	  fontName: fontName,
	  path: 'scss/templates/_icons.scss',
	  targetPath: '../../scss/_icons.scss',
	  fontPath: '../fonts/iconsfont/'
	}))
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

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/*.js', browserSync.reload);
});