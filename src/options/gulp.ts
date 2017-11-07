import { IFileService, FileService } from "../services/fileService";
import * as program from "commander";

export interface IGulp {
    createGulpfile(projectName: string):void;
    createGulpDependencies():string;
    createProgramCommands():string;
}

export class Gulp implements IGulp {
    _fileService: IFileService = new FileService();

    createGulpfile(projectName: string): void {
        let rootPath = './' + projectName;
        this._fileService.saveFile(rootPath + '/gulpfile.js', this.createGulpfileContents());
    }
    createGulpDependencies(): string {
        let devDependencies: any = {
            "autoprefixer": "^7.1.2",
            "cross-env": "^3.0.0",
            "gulp": "^3.9.1",
            "gulp-postcss": "^7.0.0",
            "gulp-webserver": "^0.9.1",
            "cssnano": "^3.10.0",
        }

        if(program.less) {
            devDependencies['gulp-less'] = "^3.3.2";
        } else {
            devDependencies['gulp-sass'] = "^3.1.0";
        }

        return devDependencies;
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
                    `\tgulp.src('.')\n` +
                      `\t\t.pipe(webserver({\n` +
                        `\t\t\tlivereload:       true,\n` +
                        `\t\t\tdirectoryListing: false,\n` +
                        `\t\t\topen:             true\n` +
                      `\t\t}));\n` +
                  `});` +
                  `\n` +
                `gulp.task('${styleFormat}', function () {\n` +
                    `\treturn gulp.src('./src/${styleFormat}/styles${extension}')\n` +
                    `\t\t.pipe(sourcemaps.init())\n` +
                    `\t\t.pipe(sass().on('error', sass.logError))\n` +
                    `\t\t.pipe(postcss())\n` +
                    `\t\t.pipe(sourcemaps.write('./'))\n` +
                    `\t\t.pipe(gulp.dest('./build'));\n` +
                `});\n` +
                `\n` +
                `gulp.task('${styleFormat}:watch', function () {\n` +
                    `\tgulp.watch('./src/${styleFormat}/**/*${extension}', ['${styleFormat}']);\n` +
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