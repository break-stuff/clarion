import { IFileService, FileService } from "../services/fileService";
import * as program from "commander";

export interface IGulp {
    createGulpfile(projectName: string):void;
    createGulpDependencies():string[];
    createProgramCommands():string;
}

export class Gulp implements IGulp {
    _fileService: IFileService = new FileService();

    createGulpfile(projectName: string): void {
        let rootPath = './' + projectName;
        this._fileService.saveFile(rootPath + '/gulpfile.js', this.createGulpfileContents());
    }
    createGulpDependencies(): string[] {
        let dependencies:string[] = [
            "autoprefixer",
            "cssnano",
            "pixrem",
            "cross-env",
            "gulp",
            "gulp-postcss",
            "gulp-webserver",
            "gulp-sourcemaps"
        ];

        dependencies.push(program.less ? 'gulp-less' : 'gulp-sass');

        return dependencies;
    }

    createGulpfileContents(): string {
        let extension = this._fileService.getFileExtension(null);
        let styleFormat = this._fileService.getStyleFormat(extension);
        let contents: string =`'use strict'\n` +
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

    createProgramCommands(): string {
        let commands:any = {
            "dev": "cross-env NODE_ENV=development gulp dev",
            "build": "cross-env NODE_ENV=production gulp build"
        }

        return commands;
    }
}