import { IFileService, FileService } from "../services/fileService";
import * as program from "commander";

export interface IGrunt {
    createGruntfile(projectName: string):void;
    createGruntDependencies():string;
}

export class Grunt implements IGrunt {
    fileService: IFileService = new FileService();

    createGruntfile(projectName: string): void {
        let rootPath = './' + projectName;
        this.fileService.saveFile(rootPath + '/gruntfile.js', this.createGruntfileContents());
    }
    createGruntDependencies(): string {
        let stylePackage = program.less ? `"gulp-less": "^3.3.2"` : `"gulp-sass": "^3.1.0"`;
        return `  "devDependencies": {
            "autoprefixer": "^7.1.2",
            "gulp": "^3.9.1",
            ${stylePackage},
            "gulp-postcss": "^7.0.0",
            "gulp-rename": "^1.2.2"
            }`;
    }

    createGruntfileContents(): string {
        let extension = this.fileService.getFileExtension(null).replace('.', '');
        let packageName = extension === 'less' ? 'less' : 'sass';
        let contents: string =`COMING SOON!!!`;        

        return contents;
    }
}