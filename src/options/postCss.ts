import { IFileService, FileService } from "../services/fileService";
import data from '../data/postCss';

export interface IPostCssConfig {
    createPostCssConfig(projectName: string): void;
}

export class PostCssConfig implements IPostCssConfig {
    _fileService: IFileService = new FileService();
    createPostCssConfig(projectName: string): void {
        let content = 'module.exports = ' + JSON.stringify(data.config, null, '\t');

        this._fileService.saveFile(`./${projectName}/postcss.config.js`, content);
    }
}