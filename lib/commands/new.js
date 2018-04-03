"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fileService_1 = require("../services/fileService");
const projectService_1 = require("../services/projectService");
const logService_1 = require("../services/logService");
const directoryService_1 = require("../services/directoryService");
const shellService_1 = require("../services/shellService");
const projectData_1 = require("../data/projectData");
class NewProject {
    constructor() {
        this._fileService = new fileService_1.FileService();
        this._logService = new logService_1.LogService();
        this._directoryService = new directoryService_1.DirectoryService();
        this._shellService = new shellService_1.ShellService();
        this._projectService = new projectService_1.ProjectDataService();
        this._styleRootPath = '';
    }
    createNewProject() {
        let projectName = program.args[1] || '';
        if (!program.only) {
            this.createScriptScaffolding(projectName);
            this.createTaskRunner(projectName);
            this.createPackageJson(projectName);
            this.createIndexHtml(projectName);
        }
        this.createStyleScaffolding(projectName);
        this.displayStartupInstructions(projectName);
    }
    createScriptScaffolding(projectName) {
        let extension = this._fileService.getFileExtension(null);
        let styleFormat = this._fileService.getStyleFormat(extension);
        this._styleRootPath = `./src/${styleFormat}/styles${extension}`;
        let mainContents = this.isWebPack ? `import '../${styleFormat}/styles${extension}';` : '';
        if (projectName) {
            this._directoryService.createDirectory(projectName);
        }
        projectData_1.projectData.projectDirectories.forEach(x => {
            this._directoryService.createDirectory(x.replace('%%projectName%%', projectName));
        });
        this._fileService.saveFile(`./${projectName}/src/scripts/main.js`, mainContents);
    }
    isWebPack() {
        switch (true) {
            case program.gulp:
                return false;
            case program.grunt:
                return false;
            case program.parcel:
                return false;
            default:
                return true;
        }
    }
    createStyleScaffolding(projectName) {
        let extension = this._fileService.getFileExtension(null);
        let rootPath = this.createStyleRootDirectory(projectName, extension);
        let importStatements = this.createStyleDirectories(rootPath, extension);
        this.createRootManifest(rootPath, extension, importStatements);
    }
    createStyleRootDirectory(projectName, extension) {
        let rootPath = './';
        if (!program.only) {
            extension = this._fileService.getStyleFormat(extension);
            rootPath = `./${projectName}/src/${extension}`;
            this._directoryService.createDirectory(rootPath);
        }
        return rootPath;
    }
    createStyleDirectories(rootPath, extension) {
        let importStatements = '';
        projectData_1.projectData.styleDirectories.forEach((dir, i) => {
            this._directoryService.createDirectory(`${rootPath}/${dir}`);
            this._fileService.saveFile(`${rootPath}/${dir}/index${extension}`, '');
            importStatements += `@import './${dir}/index${extension}';\n`;
        });
        return importStatements;
    }
    createRootManifest(rootPath, extension, importStatements) {
        this._fileService.saveFile(`${rootPath}/styles${extension}`, importStatements);
    }
    createPackageJson(projectName) {
        projectData_1.projectData.packageJson.name = projectName || 'your_project_name';
        projectData_1.projectData.packageJson.scripts = this._projectData.projectCommands;
        this._fileService.saveFile(`./${projectName}/package.json`, JSON.stringify(projectData_1.projectData.packageJson, null, '\t'));
        this._shellService.installNPMDependencies(projectName, this._projectData.devDependencies, true);
    }
    createTaskRunner(projectName) {
        this._projectData = this._projectService.getProjectData(projectName);
    }
    createIndexHtml(projectName) {
        let jsDir = program.parcel ? './src/scripts/main.js' : './dist/scripts.js';
        let cssDir = program.parcel ? this._styleRootPath : './dist/styles.css';
        let contents = this._projectService.getHtmlTemplate(cssDir, jsDir);
        this._fileService.saveFile(`./${projectName}/index.html`, contents);
    }
    displayStartupInstructions(projectName) {
        if (!program.only) {
            this._logService.info('\nTo get started run the following command:');
            if (projectName)
                this._logService.info(`cd ${projectName}`);
            this._logService.info('npm run dev');
        }
    }
}
exports.NewProject = NewProject;
