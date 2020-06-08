'use strict'
/* Dependencias */
var gulp    = require('gulp'),
	server = require('gulp-server-livereload'),
	
	jade = require('gulp-jade'),
	affected = require('gulp-jade-find-affected'),
	pug = require('gulp-pug'),

	sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	cssmin = require('gulp-cssmin'),

	coffee = require('gulp-coffee'),
	minify = require('gulp-minify'),

	gutil   = require('gulp-util'),
	clean = require('gulp-clean'),
	notify  = require('gulp-notify'),
	uglify  = require('gulp-uglify'),
	watch   = require('gulp-watch'),
	concat  = require('gulp-concat'),
	rename = require('gulp-rename'),
	filter = require('gulp-filter'),
	//cache = require('gulp-cache'),
	//imagemin = require('gulp-imagemin'),

	runSequence = require('run-sequence');

 

/* Variables path */
var paths = {
	dist: 'dist',
};

/* Configuración de las tareas de borrado de archivos */
gulp.task('borrado', function () {
	return gulp.src(['./dist/*'],
		{read: false}
	)
	.pipe(clean())
	.pipe(notify("End Clear: <%= file.relative %>"));
})


/* Configuración del 'server' */
gulp.task('webserver', function(){
	gulp.src('./dist')
	.pipe(server({
		host: '0.0.0.0',
		port: 6500,
		path: './dist',
		directoryListing: false,
		open: false,
		livereload:{
			enable: true,
			port: 6510
		}
	}));
});

/* Configuración de la tarea 'jade' / 'pug' */
gulp.task('jade', function(){
	var YOUR_LOCALS = {};
	return gulp.src('./src/jade/*.jade')
	.pipe(jade({
		pretty: true,
		debug: false,
		locals: YOUR_LOCALS
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(notify("End Compile Jade: <%= file.relative %>"));
});

gulp.task('jadeP', function(){
	var YOUR_LOCALS = {};
	return gulp.src('./src/jade/*.jade')
	.pipe(jade({
		pretty: false,
		debug: false,
		locals: YOUR_LOCALS
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(notify("End Compile Jade: <%= file.relative %>"));
});



gulp.task('sass', function () {
	return gulp.src('./src/sass/*.sass')
	.pipe(sass())
	.on('error', function(error){
		console.log(error);
	})
	.pipe(gulp.dest('./dist/css'))
	.pipe(notify("End Compile Scss: <%= file.relative %>"));
});
gulp.task('sassP', function () {
	return gulp.src('./src/sass/*.sass')
	.pipe(sass())
	.on('error', function(error){
		console.log(error);
	})
	.pipe(cssmin())
	.pipe(cssmin({keepSpecialComments : 0}))
	.pipe(gulp.dest('./src/webFiles/css'))
	.pipe(gulp.dest('./dist/css'))
	.pipe(notify("End Compile Scss: <%= file.relative %>"));
});



/* Configuración de la tarea 'images' */
 gulp.task('image', function() {
 	return gulp.src('./src/webFiles/img'+'/**/*')
 	.pipe(gulp.dest('./dist/img/'))
 	.pipe(notify("End Copy Images: <%= file.relative %>"));
}); 
gulp.task('imageP', function() {
 	return gulp.src('./src/webFiles/img'+'/**/*')
 	.pipe(gulp.dest('./dist/img/'))
 	.pipe(notify("End Copy Images: <%= file.relative %>"));
});


/* Configuración de la tarea 'js' */
gulp.task('javaScript', function() {
 	return gulp.src('./src/webFiles/js'+'/**/*')
 	.pipe(gulp.dest('./dist/js/'))
 	.pipe(notify("End Copy Js: <%= file.relative %>"));
});
gulp.task('javaScriptP', function() {
 	return gulp.src('./src/webFiles/js'+'/**/*')
 	.pipe(uglify())
 	.pipe(gulp.dest('./dist/js/'))
 	.pipe(notify("End Copy Js: <%= file.relative %>"));
});



/* Configuración de la tarea 'js' */
gulp.task('manifest', function() {
 	return gulp.src('./src/webFiles/recursos_mobile'+'/**/*')
 	.pipe(gulp.dest('./dist/recursos_mobile/'))
 	.pipe(notify("End Compile Copy Manifest: <%= file.relative %>"));
});
gulp.task('download', function() {
 	return gulp.src('./src/webFiles/download'+'/**/*')
 	.pipe(gulp.dest('./dist/download/'))
 	.pipe(notify("End Copy Download Archives: <%= file.relative %>"));
});
gulp.task('serviceWorker', function() {
	return gulp.src('./src/webFiles/js/firebase-messaging-sw.js')
	.pipe(gulp.dest('./dist/'))
	.pipe(notify("End Copy SW: <%= file.relative %>"));
});


gulp.task('sinCompresJS', function() {
 	return gulp.src('./src/webFiles/js/script.js')
 	.pipe(rename({ suffix: '.min' }))
 	.pipe(gulp.dest('./src/webFiles/js/'))
 	.pipe(notify("End Copy Js: <%= file.relative %>"));
});
gulp.task('compresJS', function() {
	return gulp.src('./src/webFiles/js/script.js')
	.pipe(minify({
		ext:{
			min:'.min.js'
        	}
        }))
	.pipe(gulp.dest('./src/webFiles/js/'))
	.pipe(notify("End compresJS: <%= file.relative %>"));
});

/*------   Compresion de imagenes    -----*/
gulp.task('imagesMin', function () {
    return gulp.src('./src/webFiles/img/'+'/**/*')
        .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.mozjpeg({quality: 75, progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({plugins: [{removeViewBox: true}] })
        ]))
       .pipe(gulp.dest('./dist/img/'))
       .pipe(notify("End Img compress: <%= file.relative %>"));   
});
/*------   Compresion de imagenes con Cache    -----*/
// gulp.task('imagesMinCache', function () {
//     return gulp.src('./src/webFiles/img/'+'/**/*')
//         .pipe(cache(imagemin([
//           imagemin.gifsicle({interlaced: true}),
//           imagemin.mozjpeg({quality: 75, progressive: true}),
//           imagemin.optipng({optimizationLevel: 5}),
//           imagemin.svgo({plugins: [{removeViewBox: true}] })
//         ])))
//        .pipe(gulp.dest('./dist/img/'))
//        .pipe(notify("End Img compress: <%= file.relative %>"));
// });



/* Configuración de la tarea 'js' */
gulp.task('js', function() {
	gulp.src(
		['./dist/js/script.js']
	)
	.pipe(concat("script.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});



/* Configuración de la tarea 'coffee' */
gulp.task('coffee', function(){
	return gulp.src('./src/coffee/*.coffee')
	.pipe(coffee().on('error', gutil.log))
	.pipe(gulp.dest('./dist/js'))
	.pipe(notify("End  Compile  Js: <%= file.relative %>"));
});

gulp.task('copy:bower', function () {
	return gulp.src(mainBowerFiles(['**/*.js', '!**/*.min.js']))
	.pipe(gulp.dest(paths.dist+'/js/libs'))
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(paths.dist+'/js/libs'))
	.pipe(notify("End Bower Copy Flie Js: <%= file.relative %>"));
});

gulp.task('copy:bowerCss', function () {
	return gulp.src(mainBowerFiles(['**/*.css', '!**/*.min.css']))
	.pipe(gulp.dest(paths.dist+'/css/libs'))
	.pipe(cssmin({keepSpecialComments : 0}))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(paths.dist+'/css/libs'))
	.pipe(notify("End Bower Copy Flie Css: <%= file.relative %>"));
});

gulp.task('copy:bowerImg', function () {
	return gulp.src(mainBowerFiles(['**/*.jpg', '**/*.png','**/*.gif']))
	.pipe(gulp.dest(paths.dist+'/css/libs'))
	.pipe(notify("End Bower Copy Flie Img: <%= file.relative %>"));
});

gulp.task('copy:bowerImages', function () {
	return gulp.src(mainBowerFiles(['**/images/**/*']))
	.pipe(gulp.dest(paths.dist+'/css/libs/images'))
	.pipe(notify("End Bower Copy Flie Images: <%= file.relative %>"));
});





/* Configuración de la tarea 'compass' */
gulp.task('compass', function(){
	return gulp.src('./src/sass/*.sass')
	.pipe(compass({
		config_file: './src/config.rb',
		css: './dist/css',
		sass: 'src/sass'
	}))
	.on('error', function(error){
		console.log(error);
	})
	.pipe(gulp.dest('./dist/css'))
	.pipe(notify("End  Compile Sass: <%= file.relative %>"));
});







/* Configuración de la tarea 'jade:watch' / 'pug:watch' */
gulp.task('jadeUnit:watch',  function(){
	var YOUR_LOCALS = {};
	watch('./src/jade/**/*.jade')
		.pipe(affected())
		.pipe(jade({
			pretty: true,
			locals: YOUR_LOCALS
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe(notify("End Compile Jade: <%= file.relative %>"));
		//gulp.start('cleanI');
}); 

gulp.task('pugUnit:watch',  function(){
	watch('./src/pug/**/*.pug')
		.pipe(affected())
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe(notify("End Compile Pug: <%= file.relative %>"));
		//gulp.start('cleanI');
}); 

gulp.task('jade:watch', function(){
	gulp.watch('./src/jade/**/*.jade', ['jade']);
});

gulp.task('pug:watch', function(){
	gulp.watch('./src/pug/**/*.pug', ['pug']);
});


/* Configuración de la tarea 'compass:watch' */
gulp.task('compass:watch', function(){
	gulp.watch('./src/sass/**/*.sass', ['compass']);
});


gulp.task('sass:watch', function () {
	gulp.watch('./src/sass/**/*.sass',['sass']);
});


gulp.task('javaScript:watch', function () {
	gulp.watch('./src/webFiles/js/**/*.js',['sinCompresJS','javaScript']);
});

gulp.task('sW:watch', function () {
	gulp.watch('./src/webFiles/js/firebase-messaging-sw.js',['serviceWorker']);
});




/* Configuración de la tarea 'coffee:watch' */
gulp.task('coffee:watch', function(){
	gulp.watch('./src/coffee/**/*.coffee', ['coffee']);
});


/* Configuración de la tarea 'watch' */
gulp.task('watch', function(){
	gulp.watch('./src/jade/**/*.jade', ['jade']);
	// gulp.watch('./src/pug/**/*.pug', ['pug']);
	gulp.watch('./src/sass/**/*.sass', ['compass']);
	gulp.watch('./src/coffee/**/*.coffee', ['coffee']);
});

gulp.task('includes', function(){
	gulp.watch('dist/**/*.html')
})

/* Configuración de la tarea 'clean' */
gulp.task('cleanI', function(){
	gulp.watch('dist/**/*')
})


gulp.task('dev', function () {
	return  runSequence('borrado', 'manifest', 'imageP', 'download', 'sinCompresJS', 'javaScript', 'serviceWorker', 'jade', 'sass', 'webserver', ['jade:watch', 'sass:watch', 'javaScript:watch','sW:watch']);
});

gulp.task('devProdZip', function () {
	return  runSequence('borrado', 'manifest', 'imagesMin', 'download', 'compresJS', 'javaScript', 'serviceWorker', 'jadeP', 'sassP');
});

gulp.task('devProd', function () {
	return  runSequence('manifest', 'imageP', 'download', 'compresJS', 'javaScript', 'serviceWorker', 'jadeP', 'sassP');
});


gulp.task('default', ['devProd']);