import { IFileManager, FileManager } from "../fileManager";

export interface IPostCssConfig {
    createPostCssConfig(projectName: string): void;
}

export class PostCssConfig implements IPostCssConfig {
    _fileManager: IFileManager = new FileManager();
    createPostCssConfig(projectName: string): void {
        let content = `module.exports = {\n` +
            `\tplugins: {\n` +
            `\t\t'autoprefixer': {},\n` +
            `\t\t'cssnano': {}\n` +
            `\t}\n` +
            `};`

        this._fileManager.saveFile(`./${projectName}/postcss.config.js`, content);
    }
}