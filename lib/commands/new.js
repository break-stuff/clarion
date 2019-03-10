"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newProject_1 = require("../data/newProject");
const fileService_1 = require("../services/fileService");
const projectService_1 = require("../services/projectService");
const logService_1 = require("../services/logService");
const directoryService_1 = require("../services/directoryService");
const shellService_1 = require("../services/shellService");
const projectData_1 = require("../data/projectData");
const styleContentData_1 = require("../data/styleContentData");
class NewProject {
    constructor() {
        this._fileService = new fileService_1.FileService();
        this._logService = new logService_1.LogService();
        this._directoryService = new directoryService_1.DirectoryService();
        this._shellService = new shellService_1.ShellService();
        this._styleRootPath = '';
    }
    init(projectName, newProductInfo) {
        this._newProductInfo = newProductInfo;
        this._projectService = new projectService_1.ProjectDataService(this._newProductInfo);
        this.createNewProject(projectName);
    }
    createNewProject(projectName) {
        if (this._newProductInfo.projectType !== newProject_1.newProject.options.projectType.architectureOnly
            && this._newProductInfo.projectType !== newProject_1.newProject.options.projectType.stylesOnly) {
            this.createScriptScaffolding(projectName);
            this.createTaskRunner(projectName);
            this.createPackageJson(projectName);
            this.createIndexHtml(projectName);
        }
        this.createStyleScaffolding(projectName);
        this.addStyleFramework(projectName);
        this.displayStartupInstructions(projectName);
    }
    createScriptScaffolding(projectName) {
        let extension = this._newProductInfo.styleFormat.toLowerCase();
        this._styleRootPath = `./src/${extension}/styles.${extension}`;
        let mainContents = this._newProductInfo.pipeline === newProject_1.newProject.options.pipeline.webpack ? `import '../${extension}/styles.${extension}';` : '';
        if (projectName) {
            this._directoryService.createDirectory(projectName);
        }
        projectData_1.projectData.projectDirectories.forEach(x => {
            this._directoryService.createDirectory(x.replace('%%projectName%%', projectName));
        });
        this._fileService.saveFile(`./${projectName}/src/scripts/main.js`, mainContents);
    }
    createStyleScaffolding(projectName) {
        let extension = this._newProductInfo.styleFormat.toLowerCase();
        let rootPath = this.createStyleRootDirectory(projectName, extension);
        let importStatements = this.createStyleDirectories(rootPath, extension);
        this.createRootManifest(rootPath, extension, importStatements);
    }
    createStyleRootDirectory(projectName, extension) {
        let rootPath = './';
        if (this._newProductInfo.projectType !== newProject_1.newProject.options.projectType.architectureOnly) {
            rootPath = `./${projectName}/src/${extension}`;
            this._directoryService.createDirectory(rootPath);
        }
        return rootPath;
    }
    createStyleDirectories(rootPath, extension) {
        let importStatements = '';
        projectData_1.projectData.styleDirectories.forEach((dir) => {
            this._directoryService.createDirectory(`${rootPath}/${dir.name}`);
            this._fileService.saveFile(`${rootPath}/${dir.name}/index.${extension}`, '');
            this._fileService.saveFile(`${rootPath}/${dir.name}/README.md`, dir.readMe);
            importStatements += `@import './${dir.name}/index${this._fileService.getImportExtension(extension)}\n`;
        });
        return importStatements;
    }
    createRootManifest(rootPath, extension, importStatements) {
        this._fileService.saveFile(`${rootPath}/styles.${extension}`, importStatements);
    }
    createPackageJson(projectName) {
        projectData_1.projectData.packageJson.name = projectName
            .replace(/\s+/g, '-')
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();
        projectData_1.projectData.packageJson.scripts = this._projectData.projectCommands;
        this._fileService.saveFile(`./${projectName}/package.json`, JSON.stringify(projectData_1.projectData.packageJson, null, '\t'));
        this._shellService.installNPMDependencies(projectName, this._projectData.devDependencies, true);
    }
    createTaskRunner(projectName) {
        this._projectData = this._projectService.getProjectData(projectName);
    }
    createIndexHtml(projectName) {
        let isParcel = this._newProductInfo.pipeline === newProject_1.newProject.options.pipeline.parcel;
        let jsDir = isParcel ? './src/scripts/main.js' : './dist/scripts.js';
        let cssDir = isParcel ? this._styleRootPath : './dist/styles.css';
        let contents = this._projectService.getHtmlTemplate(cssDir, jsDir);
        this._fileService.saveFile(`./${projectName}/index.html`, contents);
    }
    displayStartupInstructions(projectName) {
        if (this._newProductInfo.projectType !== newProject_1.newProject.options.projectType.architectureOnly) {
            this._logService.info('\nTo get started run the following command:');
            if (projectName)
                this._logService.info(`cd ${projectName}`);
            this._logService.info('npm run dev');
        }
    }
    addStyleFramework(projectName) {
        if (this._newProductInfo.projectType !== 'Architecture Only') {
            this._directoryService.createDirectory(`./${projectName}/src/${this._newProductInfo.styleFormat.toLowerCase()}/00_Abstracts/mixins`);
            this._directoryService.createDirectory(`./${projectName}/src/${this._newProductInfo.styleFormat.toLowerCase()}/00_Abstracts/functions`);
            styleContentData_1.styleContent
                .filter(x => x.format === this._newProductInfo.styleFormat.toLowerCase())
                .forEach(x => x.styles
                .forEach(y => this._fileService.saveFile(`./${projectName}/src/${this._newProductInfo.styleFormat.toLowerCase()}/${y.file}`, y.content)));
        }
    }
}
exports.NewProject = NewProject;
