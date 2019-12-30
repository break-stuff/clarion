import { IFileService, FileService } from "../services/fileService";
import { IProjectTypeData, projectData } from '../data/projectData';
import { INewProjectInfo, newProject } from "../data/newProject";

export interface IProjectData {
    devDependencies: string[];
    projectCommands: object;
}

export interface IProjectDataService {
    getProjectData(projectName: string): IProjectData;
    getHtmlTemplate(cssPath: string, jsPath: string): string;
}

export class ProjectDataService implements IProjectDataService {
    _fileService: IFileService = new FileService();
    _projectTypeData: IProjectTypeData;

    constructor(private _pipeline: string, private _styleFormat: string) {
        this._projectTypeData = this.getProjectTypeData();
    }

    getProjectData(projectName: string): IProjectData {
        if (this._pipeline !== newProject.options.pipeline.parcel)
            this.createBundleConfigurationFile(projectName);

        if (this._pipeline !== newProject.options.pipeline.grunt)
            this.createPostCssConfig(projectName);

        return {
            devDependencies: this.getProjectDependencies(),
            projectCommands: this._projectTypeData.npmCommands
        };
    }

    getHtmlTemplate(cssPath: string, jsPath: string): string {
        return projectData.indexHtml
            .replace(/%%cssDir%%/g, cssPath)
            .replace(/%%jsDir%%/g, jsPath);
    }

    createBundleConfigurationFile(projectName: string): void {
        let rootPath = './' + projectName;
        this._fileService.saveFile(rootPath + '/' + this._projectTypeData.configFile, this.getConfigFileContents());
    }

    createPostCssConfig(projectName: string): void {
        let content = 'module.exports = ' + JSON.stringify(projectData.postCssConfig, null, '\t');
        this._fileService.saveFile(`./${projectName}/postcss.config.js`, content);
    }

    getConfigFileContents(): string {
        let extension = this._fileService.getFileExtension(null).replace('.', '');
        let styleFormat = extension === 'less' ? 'less' : 'sass';

        return this.updateConfigTemplateWithProjectData(extension, styleFormat);
    }

    updateConfigTemplateWithProjectData(extension: string, styleFormat: string) {
        let contents: string = this._projectTypeData.configContents
            .replace(/%%styleFormat%%/g, styleFormat)
            .replace(/%%extension%%/g, extension);

        if (this._pipeline === 'Grunt') {
            if (styleFormat === 'less') {
                contents = contents.replace(/grunt-less/g, 'grunt-contrib-less');
            }

            if (styleFormat === 'sass') {
                contents = 'const sass = require("node-sass");\n\n' + contents;
                contents = contents.replace(/sass: {\n/g, 'sass: {\n\t\t\toptions: {\n\t\t\t\timplementation: sass,\n\t\t\t\tsourceMap: true\n\t\t\t},\n');
            }
        }

        if (this._pipeline === 'Webpack') {
            if (styleFormat === 'less') {
                contents = contents.replace('(scss|sass)', 'less');
            }
        }

        return contents;
    }

    getProjectDependencies(): string[] {
        let dependencies = this._projectTypeData.devDependencies;
        return dependencies.concat(this._styleFormat === newProject.options.styleFormat.less ? this._projectTypeData.lessDependencies : this._projectTypeData.sassDependencies);
    }

    getProjectTypeData() {
        switch (true) {
            case this._pipeline === newProject.options.pipeline.grunt:
                return projectData.grunt;
            case this._pipeline === newProject.options.pipeline.gulp:
                return projectData.gulp;
            case this._pipeline === newProject.options.pipeline.parcel:
                return projectData.parcel;
            default:
                return projectData.webpack;
        }
    }
}