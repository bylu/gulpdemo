var gulp = require('gulp');
var uglify = require('gulp-uglify'), //js压缩
    htmlmin = require('gulp-htmlmin'),//html压缩
    imagemin=require('gulp-imagemin'),//图片压缩
    pngcrush=require('imagemin-pngcrush'),
    jshint=require('gulp-jshint'), //js检测
    concat=require('gulp-concat'),//文件合并
    rename=require('gulp-rename'),//文件更名
    notify=require('gulp-notify'),//提示信息
    minifycss =require('gulp-minify-css'); //css压缩

    gulp.task('gulpdemo', function () { // 方法名  压缩js的使用
        gulp.src('src/test.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('cssdemo',function(){ //压缩css页面
        gulp.src('src/*.css')
            .pipe(minifycss({
                advanced:false,
                compatibility:'ie7',
                keepBreaks:true,
                keepSpecialComments:'*'
            }))
            .pipe(gulp.dest('dist/css/'));
    });

    gulp.task('html',function(){ //压缩html
        return gulp.src('src/*.html')
            .pipe(htmlmin({collapseWhitespace:true }))
            .pipe(gulp.dest('./dest'))
            .pipe(notify({ message:'html task ok' }));
    });

    gulp.task('img',function(){ //压缩图片
        return gulp.src('src/images/*')
            .pipe(imagemin({
                progressive:true,
                svgoPlugins:[{ removeViewBox:false }],
                use:[pngcrush()]
            }))
            .pipe(gulp.dest('./dest/images/'))
            .pipe(notify({ message:'img task ok' }));
    });

    gulp.task('css',function(){ //合并，压缩。重命名css
        return gulp.src('src/css/*.css')
            .pipe(concat('main.css'))
            .pipe(gulp.dest('dest/css'))
            .pipe(rename({ suffix:'.main' }))
            .pipe(minifycss())
            .pipe(gulp.dest('dest/css'))
            .pipe(notify({ message:'css task ok' }));
    });

    gulp.task('lint',function(){ //检查js
        return gulp.src('src/js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(notify({ message:'link task ok' }));
    });

    gulp.task('js',function(){ //合并 压缩js 文件
        return gulp.src('src/js/*.js')
            .pipe(concat('all.js'))
            .pipe(gulp.dest('dest/js'))
            .pipe(rename({ suffix:'.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dest/js'))
            .pipe(notify({ message:'js task ok' }));
    });

    gulp.task('default',function(){ //默认任务
        gulp.run('img','css','lint','js','html');

        //监听html文件变化
        gulp.watch('src/*.html',function(){
            gulp.run('html');
        });

        //Watch .css files
        gulp.watch('src/css/*.css',['css']);

       //Watch .js files
        gulp.watch('src/js/*.js',['lint','js']);

        //Watch images files

        gulp.watch('src/images/*',['img']);
    });
	