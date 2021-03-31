const { src, dest, watch, series, parallel } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const csso = require("gulp-csso");
const prefix = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const jsmin = require("gulp-jsmin");
const fileInclude = require("gulp-file-include");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

//Files for which we do not use plugins
let files = [
    { name: "*", folder: "fonts" },
    { name: "*", folder: "slick" }
];

const html = function () {
    return src("src/**/*.html")
        .pipe(fileInclude({ prefix: "@@" }))
        .pipe(dest("dist/"))
        .pipe(browserSync.stream());
}

const style = function () {
    return src(["src/css/*.css", "src/css/*scss"])
        .pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(prefix())
        .pipe(sourcemaps.write(""))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
}

const scripts = function () {
    return src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(jsmin())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream());
}

const img = function () {
    return src(["src/image/**/*.png", "src/image/**/*.jpg", "src/image/**/*.svg"])
        .pipe(newer("dist/image"))
        .pipe(imagemin())
        .pipe(dest("dist/image"));
}

const moveFile = function (cb) {
    files.forEach(file => {
        src(`src/${file.folder}/${file.name}`)
            .pipe(dest(`dist/${file.folder}`));
    });
    cb();
}

const server = function (cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        open: true,
    });
    cb();
}

const observ = function () {
    watch("src/css/*", { usePolling: true }, style);
    watch("src/js/*", { usePolling: true }, scripts);
    watch("src/**/*.html", { usePolling: true }, html);
}

exports.default = series(html, style, scripts, img, moveFile);
exports.html = html;
exports.css = style;
exports.scripts = scripts;
exports.img = img;
exports.movefile = moveFile;
exports.watch = parallel(server, observ);