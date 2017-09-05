"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
const program = require("commander");
class Grunt {
    constructor() {
        this.fileService = new fileService_1.FileService();
    }
    createGruntfile(projectName) {
        let rootPath = './' + projectName;
        this.fileService.saveFile(rootPath + '/gruntfile.js', this.createGruntfileContents());
    }
    createGruntDependencies() {
        let stylePackage = program.less ? `"gulp-less": "^3.3.2"` : `"gulp-sass": "^3.1.0"`;
        return `  "devDependencies": {
            "autoprefixer": "^7.1.2",
            "gulp": "^3.9.1",
            ${stylePackage},
            "gulp-postcss": "^7.0.0",
            "gulp-rename": "^1.2.2"
            }`;
    }
    createGruntfileContents() {
        let extension = this.fileService.getFileExtension(null).replace('.', '');
        let packageName = extension === 'less' ? 'less' : 'sass';
        let contents = `COMING SOON!!!`;
        return contents;
    }
}
exports.Grunt = Grunt;
