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
        this._styleFileRootPath = '';
    }
    init(projectType, projectName, styleFormat, pipeline) {
        this._projectType = projectType;
        this._projectName = projectName;
        this._styleFormat = styleFormat;
        this._pipeline = pipeline;
        this._projectService = new projectService_1.ProjectDataService(pipeline, styleFormat);
        this.createNewProject();
    }
    createNewProject() {
        if (this._projectType !== newProject_1.newProject.options.projectType.architectureOnly
            && this._projectType !== newProject_1.newProject.options.projectType.stylesOnly) {
            this.createScriptScaffolding();
            this.createTaskRunner();
            this.createPackageJson();
            this.createIndexHtml();
        }
        this.createStyleScaffolding();
        this.addStyleFramework();
        this.displayStartupInstructions();
    }
    createScriptScaffolding() {
        let extension = this._styleFormat.toLowerCase();
        this._styleFileRootPath = `./src/${extension}/styles.${extension}`;
        let mainContents = this._pipeline === newProject_1.newProject.options.pipeline.webpack ? `import '../${extension}/styles.${extension}';` : '';
        if (this._projectName) {
            this._directoryService.createDirectory(this._projectName);
        }
        projectData_1.projectData.projectDirectories.forEach(x => {
            this._directoryService.createDirectory(x.replace('%%projectName%%', this._projectName));
        });
        this._fileService.saveFile(`./${this._projectName}/src/scripts/main.js`, mainContents);
    }
    createStyleScaffolding() {
        let extension = this._styleFormat.toLowerCase();
        this.createStyleRootDirectory(extension);
        let importStatements = this.createStyleDirectories(extension);
        this.createRootManifest(extension, importStatements);
    }
    createStyleRootDirectory(extension) {
        this._styleRootPath = `./${extension}`;
        if (this._projectType !== newProject_1.newProject.options.projectType.architectureOnly
            && this._projectType !== newProject_1.newProject.options.projectType.stylesOnly) {
            this._styleRootPath = `./${this._projectName}/src/${extension}`;
        }
        this._directoryService.createDirectory(this._styleRootPath);
    }
    createStyleDirectories(extension) {
        let importStatements = '';
        projectData_1.projectData.styleDirectories.forEach(styleDirectory => {
            this._directoryService.createDirectory(`${this._styleRootPath}/${styleDirectory.name}`);
            this._fileService.saveFile(`${this._styleRootPath}/${styleDirectory.name}/index.${extension}`, '');
            this._fileService.saveFile(`${this._styleRootPath}/${styleDirectory.name}/README.md`, styleDirectory.readMe);
            importStatements += `@import './${styleDirectory.name}/index${this._fileService.getImportExtension(extension)}\n`;
        });
        return importStatements;
    }
    createRootManifest(extension, importStatements) {
        this._fileService.saveFile(`${this._styleRootPath}/styles.${extension}`, importStatements);
    }
    createPackageJson() {
        projectData_1.projectData.packageJson.name = this._projectName
            .replace(/\s+/g, '-')
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();
        projectData_1.projectData.packageJson.scripts = this._projectData.projectCommands;
        this._fileService.saveFile(`./${this._projectName}/package.json`, JSON.stringify(projectData_1.projectData.packageJson, null, '\t'));
        this._shellService.installNPMDependencies(this._projectName, this._projectData.devDependencies, true);
    }
    createTaskRunner() {
        this._projectData = this._projectService.getProjectData(this._projectName);
    }
    createIndexHtml() {
        let isParcel = this._pipeline === newProject_1.newProject.options.pipeline.parcel;
        let jsDir = isParcel ? './src/scripts/main.js' : './dist/scripts.js';
        let cssDir = isParcel ? this._styleFileRootPath : './dist/styles.css';
        let contents = this._projectService.getHtmlTemplate(cssDir, jsDir);
        this._fileService.saveFile(`./${this._projectName}/index.html`, contents);
    }
    displayStartupInstructions() {
        if (this._projectType !== newProject_1.newProject.options.projectType.architectureOnly
            && this._projectType !== newProject_1.newProject.options.projectType.stylesOnly) {
            this._logService.info('\nTo get started run the following command:');
            if (this._projectName)
                this._logService.info(`cd ${this._projectName}`);
            this._logService.info('npm run dev');
        }
    }
    addStyleFramework() {
        if (this._projectType !== newProject_1.newProject.options.projectType.architectureOnly) {
            this._directoryService.createDirectory(`${this._styleRootPath}/00_Abstracts/mixins`);
            this._directoryService.createDirectory(`${this._styleRootPath}/00_Abstracts/functions`);
            styleContentData_1.styleContent
                .filter(x => x.format === this._styleFormat.toLowerCase())
                .forEach(x => x.styles
                .forEach(y => this._fileService.saveFile(`${this._styleRootPath}/${y.file}`, y.content)));
        }
    }
}
exports.NewProject = NewProject;
