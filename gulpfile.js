
const plumber = require('gulp-plumber');
const { src, dest, watch, series } = require('gulp');

// CSS and SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
    src("src/scss/app.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"))
    
    done();
}

function images( done ) {
    src("src/img/**/*")
        .pipe(imagemin({ optimizationLevel: 3}))
        .pipe(dest("build/img"))

    done();
}

function webpVersion( done ) {
    const options = {
        quality: 50
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(options))
        .pipe(dest("build/img"))

    done();
}

function avifVersion ( done ) {
    const options = {
        quality: 50
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(options))
        .pipe(dest("build/img"))

    done();
}

function dev() {
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*", images);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.default = series(images, webpVersion, avifVersion, css, dev);