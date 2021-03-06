"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
const projectData_1 = require("../data/projectData");
const newProject_1 = require("../data/newProject");
class ProjectDataService {
    constructor(_pipeline, _styleFormat) {
        this._pipeline = _pipeline;
        this._styleFormat = _styleFormat;
        this._fileService = new fileService_1.FileService();
        this._projectTypeData = this.getProjectTypeData();
    }
    getProjectData(projectName) {
        if (this._pipeline !== newProject_1.newProject.options.pipeline.parcel)
            this.createBundleConfigurationFile(projectName);
        if (this._pipeline !== newProject_1.newProject.options.pipeline.grunt)
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
        return this.updateConfigTemplateWithProjectData(extension, styleFormat);
    }
    updateConfigTemplateWithProjectData(extension, styleFormat) {
        let contents = this._projectTypeData.configContents
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
    getProjectDependencies() {
        let dependencies = this._projectTypeData.devDependencies;
        return dependencies.concat(this._styleFormat === newProject_1.newProject.options.styleFormat.less ? this._projectTypeData.lessDependencies : this._projectTypeData.sassDependencies);
    }
    getProjectTypeData() {
        switch (true) {
            case this._pipeline === newProject_1.newProject.options.pipeline.grunt:
                return projectData_1.projectData.grunt;
            case this._pipeline === newProject_1.newProject.options.pipeline.gulp:
                return projectData_1.projectData.gulp;
            case this._pipeline === newProject_1.newProject.options.pipeline.parcel:
                return projectData_1.projectData.parcel;
            default:
                return projectData_1.projectData.webpack;
        }
    }
}
exports.ProjectDataService = ProjectDataService;
