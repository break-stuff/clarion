import { newProject, INewProjectInfo } from '../data/newProject';
import { FileService, IFileService } from "../services/fileService";
import { IProjectData, IProjectDataService, ProjectDataService } from '../services/projectService';
import { ILogService, LogService } from "../services/logService";
import { IDirectoryService, DirectoryService } from "../services/directoryService";
import { IShellService, ShellService } from '../services/shellService'
import { projectData } from "../data/projectData";
import { styleContent } from '../data/styleContentData';

export interface INewProject {
    init(projectType: string, projectName: string, styleFormat: string, pipeline: string): void;
}

export class NewProject implements INewProject {
    _fileService: IFileService = new FileService();
    _logService: ILogService = new LogService();
    _directoryService: IDirectoryService = new DirectoryService();
    _shellService: IShellService = new ShellService();
    _projectService: IProjectDataService;
    _projectName: string;
    _projectType: string;
    _styleRootPath: string;
    _styleFormat: string;
    _pipeline: string;

    _styleFileRootPath: string = '';
    _projectData: IProjectData;

    init(projectType: string, projectName: string, styleFormat: string, pipeline: string) {
        this._projectType = projectType;
        this._projectName = projectName;
        this._styleFormat = styleFormat;
        this._pipeline = pipeline;
        this._projectService = new ProjectDataService(pipeline, styleFormat);
        this.createNewProject();
    }

    createNewProject(): void {
        if (this._projectType !== newProject.options.projectType.architectureOnly
            && this._projectType !== newProject.options.projectType.stylesOnly) {
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
        let mainContents = this._pipeline === newProject.options.pipeline.webpack ? `import '../${extension}/styles.${extension}';` : '';
        if (this._projectName) {
            this._directoryService.createDirectory(this._projectName);
        }

        projectData.projectDirectories.forEach(x => {
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

    createStyleRootDirectory(extension: string) {
        this._styleRootPath = `./${extension}`;
        if (
            this._projectType !== newProject.options.projectType.architectureOnly
            && this._projectType !== newProject.options.projectType.stylesOnly
        ) {
            this._styleRootPath = `./${this._projectName}/src/${extension}`;
        }

        this._directoryService.createDirectory(this._styleRootPath);
    }

    createStyleDirectories(extension: string): string {
        let importStatements = '';

        projectData.styleDirectories.forEach(styleDirectory => {
            this._directoryService.createDirectory(`${this._styleRootPath}/${styleDirectory.name}`);
            this._fileService.saveFile(`${this._styleRootPath}/${styleDirectory.name}/index.${extension}`, '');
            this._fileService.saveFile(`${this._styleRootPath}/${styleDirectory.name}/README.md`, styleDirectory.readMe);
            importStatements += `@import './${styleDirectory.name}/index${this._fileService.getImportExtension(extension)}\n`;
        });

        return importStatements
    }

    createRootManifest(extension: string, importStatements: string): void {
        this._fileService.saveFile(`${this._styleRootPath}/styles.${extension}`, importStatements);
    }

    createPackageJson() {
        projectData.packageJson.name = this._projectName
            .replace(/\s+/g, '-')
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();

        projectData.packageJson.scripts = this._projectData.projectCommands;
        this._fileService.saveFile(`./${this._projectName}/package.json`, JSON.stringify(projectData.packageJson, null, '\t'));
        this._shellService.installNPMDependencies(this._projectName, this._projectData.devDependencies, true);
    }

    createTaskRunner(): void {
        this._projectData = this._projectService.getProjectData(this._projectName);
    }


    createIndexHtml() {
        let isParcel = this._pipeline === newProject.options.pipeline.parcel;
        let jsDir = isParcel ? './src/scripts/main.js' : './dist/scripts.js';
        let cssDir = isParcel ? this._styleFileRootPath : './dist/styles.css';
        let contents = this._projectService.getHtmlTemplate(cssDir, jsDir);
        this._fileService.saveFile(`./${this._projectName}/index.html`, contents);
    }

    displayStartupInstructions(): void {
        if (this._projectType !== newProject.options.projectType.architectureOnly
            && this._projectType !== newProject.options.projectType.stylesOnly) {
            this._logService.info('\nTo get started run the following command:');
            if (this._projectName) this._logService.info(`cd ${this._projectName}`);
            this._logService.info('npm run dev');
        }
    }

    addStyleFramework(): void {
        if (this._projectType !== newProject.options.projectType.architectureOnly) {
            this._directoryService.createDirectory(`${this._styleRootPath}/00_Abstracts/mixins`);
            this._directoryService.createDirectory(`${this._styleRootPath}/00_Abstracts/functions`);
            styleContent
                .filter(x => x.format === this._styleFormat.toLowerCase())
                .forEach(x => x.styles
                    .forEach(y => this._fileService.saveFile(`${this._styleRootPath}/${y.file}`, y.content)));
        }
    }
}