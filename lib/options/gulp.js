"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
const program = require("commander");
class Gulp {
    constructor() {
        this._fileService = new fileService_1.FileService();
    }
    createGulpfile(projectName) {
        let rootPath = './' + projectName;
        this._fileService.saveFile(rootPath + '/gulpfile.js', this.createGulpfileContents());
    }
    createGulpDependencies() {
        let dependencies = [
            "autoprefixer",
            "cssnano",
            "pixrem",
            "cross-env",
            "gulp",
            "gulp-postcss",
            "gulp-webserver"
        ];
        dependencies.push(program.less ? 'gulp-less' : 'gulp-sass');
        return dependencies;
    }
    createGulpfileContents() {
        let extension = this._fileService.getFileExtension(null);
        let styleFormat = this._fileService.getStyleFormat(extension);
        let contents = `'use strict'\n` +
            '\n' +
            `var gulp = require('gulp');\n` +
            `var ${styleFormat} = require('gulp-${styleFormat}');\n` +
            `var postcss = require('gulp-postcss');\n` +
            `var webserver = require('gulp-webserver');\n` +
            `var sourcemaps = require('gulp-sourcemaps');\n` +
            `\n` +
            `gulp.task('dev', ['${styleFormat}', '${styleFormat}:watch', 'webserver'])\n` +
            `\n` +
            `gulp.task('build', ['${styleFormat}'])\n` +
            `\n` +
            `gulp.task('webserver', function() {\n` +
            `    gulp.src('.')\n` +
            `      .pipe(webserver({\n` +
            `        livereload:       true,\n` +
            `        directoryListing: false,\n` +
            `        open:             true\n` +
            `      }));\n` +
            `  });` +
            `  \n` +
            `gulp.task('${styleFormat}', function () {\n` +
            `    return gulp.src('./src/${styleFormat}/styles${extension}')\n` +
            `    .pipe(sourcemaps.init())\n` +
            `    .pipe(sass().on('error', sass.logError))\n` +
            `    .pipe(postcss())\n` +
            `    .pipe(sourcemaps.write('./'))\n` +
            `    .pipe(gulp.dest('./build'));\n` +
            `});\n` +
            `\n` +
            `gulp.task('${styleFormat}:watch', function () {\n` +
            `    gulp.watch('./src/${styleFormat}/**/*${extension}', ['${styleFormat}']);\n` +
            `});`;
        return contents;
    }
    createProgramCommands() {
        let commands = {
            "dev": "cross-env NODE_ENV=development gulp dev",
            "build": "cross-env NODE_ENV=production gulp build"
        };
        return commands;
    }
}
exports.Gulp = Gulp;
