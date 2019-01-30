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

    constructor(private _newProductInfo: INewProjectInfo) {
        this._projectTypeData = this.getProjectTypeData();        
    }

    getProjectData(projectName: string): IProjectData {
        if(this._newProductInfo.pipeline !== newProject.options.pipeline.parcel) this.createBundleConfigurationFile(projectName);
        if(this._newProductInfo.pipeline !== newProject.options.pipeline.grunt) this.createPostCssConfig(projectName);

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
        
        if(this._newProductInfo.pipeline === 'Grunt') contents.replace(/grunt-less/g, 'grunt-contrib-less');

        return contents;
    }

    getProjectDependencies(): string[] {
        let dependencies = this._projectTypeData.devDependencies;
        dependencies = dependencies.concat(this._newProductInfo.styleFormat === newProject.options.styleFormat.less ? this._projectTypeData.lessDependencies : this._projectTypeData.sassDependencies);

        return dependencies;
    }

    getProjectTypeData() {
        switch (true) {
            case this._newProductInfo.pipeline === newProject.options.pipeline.grunt:
                return projectData.grunt;
            case this._newProductInfo.pipeline === newProject.options.pipeline.gulp:
                return projectData.gulp;
            case this._newProductInfo.pipeline === newProject.options.pipeline.parcel:
                return projectData.parcel;
            default:
                return projectData.webpack;
        }
    }
}