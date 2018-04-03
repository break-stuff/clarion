import { IFileService, FileService } from "../services/fileService";
import * as program from "commander";
import { IProjectTypeData, projectData } from '../data/projectData';

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

    constructor() {
        this._projectTypeData = this.getProjectTypeData();        
    }

    getProjectData(projectName: string): IProjectData {
        if(!program.parcel) this.createBundleConfigurationFile(projectName);
        if(!program.grunt) this.createPostCssConfig(projectName);

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
        let contents: string = this._projectTypeData.configContents
                                                        .replace(/%%styleFormat%%/g, styleFormat)
                                                        .replace(/%%extension%%/g, extension);
        
        if(program.grunt) contents.replace(/grunt-less/g, 'grunt-contrib-less');

        return contents;
    }

    getProjectDependencies(): string[] {
        let dependencies = this._projectTypeData.devDependencies;
        dependencies = dependencies.concat(program.less ? this._projectTypeData.lessDependencies : this._projectTypeData.sassDependencies);

        return dependencies;
    }

    getProjectTypeData() {
        switch (true) {
            case program.grunt:
                return projectData.grunt;
            case program.gulp:
                return projectData.gulp;
            case program.parcel:
                return projectData.parcel;
            default:
                return projectData.webpack;
        }
    }
}