"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
const program = require("commander");
const projectData_1 = require("../data/projectData");
class ProjectDataService {
    constructor() {
        this._fileService = new fileService_1.FileService();
        this._projectTypeData = this.getProjectTypeData();
    }
    getProjectData(projectName) {
        if (!program.parcel)
            this.createBundleConfigurationFile(projectName);
        if (!program.grunt)
            this.createPostCssConfig(projectName);
        return {
            devDependencies: this.getProjectDependencies(),
            projectCommands: this._projectTypeData.npmCommands
        };
    }
    getHtmlTemplate(cssPath, jsPath) {
        return projectData_1.projectData.indexHtml
            .replace(/%%cssDir%%/g, cssPath)
            .replace(/%%jsDir%%/g, jsPath);
    }
    createBundleConfigurationFile(projectName) {
        let rootPath = './' + projectName;
        this._fileService.saveFile(rootPath + '/' + this._projectTypeData.configFile, this.getConfigFileContents());
    }
    createPostCssConfig(projectName) {
        let content = 'module.exports = ' + JSON.stringify(projectData_1.projectData.postCssConfig, null, '\t');
        this._fileService.saveFile(`./${projectName}/postcss.config.js`, content);
    }
    getConfigFileContents() {
        let extension = this._fileService.getFileExtension(null).replace('.', '');
        let styleFormat = extension === 'less' ? 'less' : 'sass';
        let contents = this._projectTypeData.configContents
            .replace(/%%styleFormat%%/g, styleFormat)
            .replace(/%%extension%%/g, extension);
        if (program.grunt)
            contents.replace(/grunt-less/g, 'grunt-contrib-less');
        return contents;
    }
    getProjectDependencies() {
        let dependencies = this._projectTypeData.devDependencies;
        dependencies = dependencies.concat(program.less ? this._projectTypeData.lessDependencies : this._projectTypeData.sassDependencies);
        return dependencies;
    }
    getProjectTypeData() {
        switch (true) {
            case program.grunt:
                return projectData_1.projectData.grunt;
            case program.gulp:
                return projectData_1.projectData.gulp;
            case program.parcel:
                return projectData_1.projectData.parcel;
            default:
                return projectData_1.projectData.webpack;
        }
    }
}
exports.ProjectDataService = ProjectDataService;
