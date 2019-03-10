import {newProject, INewProjectInfo} from '../data/newProject';
import { FileService, IFileService } from "../services/fileService";
import { IProjectData, IProjectDataService, ProjectDataService } from '../services/projectService';
import { ILogService, LogService } from "../services/logService";
import { IDirectoryService, DirectoryService } from "../services/directoryService";
import { IShellService, ShellService } from '../services/shellService'
import { projectData } from "../data/projectData";
import { styleContent } from '../data/styleContentData';

export interface INewProject {
    init(projectName: string, newProductInfo: INewProjectInfo): void;
}

export class NewProject implements INewProject {
    _fileService: IFileService = new FileService();
    _logService: ILogService = new LogService();
    _directoryService: IDirectoryService = new DirectoryService();
    _shellService: IShellService = new ShellService();
    _projectService: IProjectDataService;
    _newProductInfo: INewProjectInfo;

    _styleRootPath: string = '';
    _projectData: IProjectData;

    init(projectName: string, newProductInfo: INewProjectInfo) {
        this._newProductInfo = newProductInfo;
        this._projectService = new ProjectDataService(this._newProductInfo);
        this.createNewProject(projectName);
    }

    createNewProject(projectName: string): void {
        if (this._newProductInfo.projectType !== newProject.options.projectType.architectureOnly 
            && this._newProductInfo.projectType !== newProject.options.projectType.stylesOnly) {
            this.createScriptScaffolding(projectName);
            this.createTaskRunner(projectName);
            this.createPackageJson(projectName);
            this.createIndexHtml(projectName);
        }
        this.createStyleScaffolding(projectName);
        this.addStyleFramework(projectName);
        this.displayStartupInstructions(projectName);
    }

    createScriptScaffolding(projectName: string) {
        let extension = this._newProductInfo.styleFormat.toLowerCase();
        this._styleRootPath = `./src/${extension}/styles.${extension}`;
        let mainContents = this._newProductInfo.pipeline === newProject.options.pipeline.webpack ? `import '../${extension}/styles.${extension}';` : '';
        if (projectName) {
            this._directoryService.createDirectory(projectName);
        }

        projectData.projectDirectories.forEach(x => {
            this._directoryService.createDirectory(x.replace('%%projectName%%', projectName));
        });
        this._fileService.saveFile(`./${projectName}/src/scripts/main.js`, mainContents);
    }

    createStyleScaffolding(projectName: string) {
        let extension = this._newProductInfo.styleFormat.toLowerCase();
        let rootPath = this.createStyleRootDirectory(projectName, extension);
        let importStatements = this.createStyleDirectories(rootPath, extension);
        this.createRootManifest(rootPath, extension, importStatements);
    }

    createStyleRootDirectory(projectName: string, extension: string): string {
        let rootPath = './';
        if (this._newProductInfo.projectType !== newProject.options.projectType.architectureOnly) {
            rootPath = `./${projectName}/src/${extension}`;
            this._directoryService.createDirectory(rootPath);
        }
        return rootPath;
    }

    createStyleDirectories(rootPath: string, extension: string): string {
        let importStatements = '';

        projectData.styleDirectories.forEach((dir) => {
            this._directoryService.createDirectory(`${rootPath}/${dir.name}`);
            this._fileService.saveFile(`${rootPath}/${dir.name}/index.${extension}`, '');
            this._fileService.saveFile(`${rootPath}/${dir.name}/README.md`, dir.readMe);
            importStatements += `@import './${dir.name}/index${this._fileService.getImportExtension(extension)}\n`;
        });

        return importStatements
    }

    createRootManifest(rootPath: string, extension: string, importStatements: string): void {
        this._fileService.saveFile(`${rootPath}/styles.${extension}`, importStatements);
    }

    createPackageJson(projectName: string) {
        projectData.packageJson.name = projectName
                    .replace(/\s+/g, '-')
                    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                    .toLowerCase();

        projectData.packageJson.scripts = this._projectData.projectCommands;
        this._fileService.saveFile(`./${projectName}/package.json`, JSON.stringify(projectData.packageJson, null, '\t'));
        this._shellService.installNPMDependencies(projectName, this._projectData.devDependencies, true);
    }

    createTaskRunner(projectName: string): void {
        this._projectData = this._projectService.getProjectData(projectName);
    }


    createIndexHtml(projectName: string) {
        let isParcel = this._newProductInfo.pipeline === newProject.options.pipeline.parcel;
        let jsDir = isParcel ? './src/scripts/main.js' : './dist/scripts.js';
        let cssDir = isParcel ? this._styleRootPath : './dist/styles.css';
        let contents = this._projectService.getHtmlTemplate(cssDir, jsDir);
        this._fileService.saveFile(`./${projectName}/index.html`, contents);
    }

    displayStartupInstructions(projectName: string): void {
        if (this._newProductInfo.projectType !== newProject.options.projectType.architectureOnly) {
            this._logService.info('\nTo get started run the following command:');
            if (projectName) this._logService.info(`cd ${projectName}`);
            this._logService.info('npm run dev');
        }
    }

    addStyleFramework(projectName: string): void {
        if(this._newProductInfo.projectType !== 'Architecture Only') {
            this._directoryService.createDirectory(`./${projectName}/src/${this._newProductInfo.styleFormat.toLowerCase()}/00_Abstracts/mixins`);
            this._directoryService.createDirectory(`./${projectName}/src/${this._newProductInfo.styleFormat.toLowerCase()}/00_Abstracts/functions`);
            styleContent
                .filter(x => x.format === this._newProductInfo.styleFormat.toLowerCase())
                .forEach(x => x.styles
                    .forEach(y => this._fileService.saveFile(`./${projectName}/src/${this._newProductInfo.styleFormat.toLowerCase()}/${y.file}`, y.content)));
        }
    }
}