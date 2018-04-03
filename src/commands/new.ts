import * as program from "commander";
import { FileService, IFileService } from "../services/fileService";
import { IProjectData, IProjectDataService, ProjectDataService } from '../services/projectService';
import { ILogService, LogService } from "../services/logService";
import { IDirectoryService, DirectoryService } from "../services/directoryService";
import { IShellService, ShellService } from '../services/shellService'
import { projectData } from "../data/projectData";

export interface INewProject {
    createNewProject(): void;
}

export class NewProject implements INewProject {
    _fileService: IFileService = new FileService();
    _logService: ILogService = new LogService();
    _directoryService: IDirectoryService = new DirectoryService();
    _shellService: IShellService = new ShellService();
    _projectService: IProjectDataService = new ProjectDataService();

    _styleRootPath: string = '';
    _projectData: IProjectData;

    createNewProject(): void {
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

    createScriptScaffolding(projectName: string) {
        let extension = this._fileService.getFileExtension(null);
        let styleFormat = this._fileService.getStyleFormat(extension);
        this._styleRootPath = `./src/${styleFormat}/styles${extension}`;
        let mainContents = this.isWebPack ? `import '../${styleFormat}/styles${extension}';` : '';
        if (projectName) {
            this._directoryService.createDirectory(projectName);
        }

        projectData.projectDirectories.forEach(x => {
            this._directoryService.createDirectory(x.replace('%%projectName%%', projectName));
        });
        this._fileService.saveFile(`./${projectName}/src/scripts/main.js`, mainContents);
    }

    isWebPack(): boolean {
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

    createStyleScaffolding(projectName: string) {
        let extension = this._fileService.getFileExtension(null);
        let rootPath = this.createStyleRootDirectory(projectName, extension);
        let importStatements = this.createStyleDirectories(rootPath, extension);
        this.createRootManifest(rootPath, extension, importStatements);
    }

    createStyleRootDirectory(projectName: string, extension: string): string {
        let rootPath = './';
        if (!program.only) {
            extension = this._fileService.getStyleFormat(extension);
            rootPath = `./${projectName}/src/${extension}`;
            this._directoryService.createDirectory(rootPath);
        }
        return rootPath;
    }

    createStyleDirectories(rootPath: string, extension: string): string {
        let importStatements = '';

        projectData.styleDirectories.forEach((dir, i) => {
            this._directoryService.createDirectory(`${rootPath}/${dir}`);
            this._fileService.saveFile(`${rootPath}/${dir}/index${extension}`, '');
            importStatements += `@import './${dir}/index${extension}';\n`;
        });

        return importStatements
    }

    createRootManifest(rootPath: string, extension: string, importStatements: string): void {
        this._fileService.saveFile(`${rootPath}/styles${extension}`, importStatements);
    }

    createPackageJson(projectName: string) {
        projectData.packageJson.name = projectName || 'your_project_name';
        projectData.packageJson.scripts = this._projectData.projectCommands;
        this._fileService.saveFile(`./${projectName}/package.json`, JSON.stringify(projectData.packageJson, null, '\t'));
        this._shellService.installNPMDependencies(projectName, this._projectData.devDependencies, true);
    }

    createTaskRunner(projectName: string): void {
        this._projectData = this._projectService.getProjectData(projectName);
    }


    createIndexHtml(projectName: string) {
        let jsDir = program.parcel ? './src/scripts/main.js' : './dist/scripts.js';
        let cssDir = program.parcel ? this._styleRootPath : './dist/styles.css';
        let contents = this._projectService.getHtmlTemplate(cssDir, jsDir);
        this._fileService.saveFile(`./${projectName}/index.html`, contents);
    }

    displayStartupInstructions(projectName: string): void {
        if (!program.only) {
            this._logService.info('\nTo get started run the following command:');
            if (projectName) this._logService.info(`cd ${projectName}`);
            this._logService.info('npm run dev');
        }
    }
}