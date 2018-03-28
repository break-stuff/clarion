import * as program from "commander";
import { FileService, IFileService } from "../services/fileService";
import { ILogService, LogService } from "../services/logService";
import { IDirectoryService, DirectoryService } from "../services/directoryService";
import { IConfigService, ConfigService } from "../services/configService";

export interface IAdd {
    addNewFile(): void;
}

export class Add implements IAdd {
    _fileService: IFileService = new FileService();
    _logService: ILogService = new LogService();
    _directoryService: IDirectoryService = new DirectoryService();
    _configService: IConfigService = new ConfigService();
    _config = this._configService.getConfigData();

    addNewFile(): void {
        switch (program.args.length) {
            case 1:
                this._logService.warning('Please add the name of a file to create.');
                break;
            case 2:
                this.addFileToCurrentDirectory();
                break;
            case 3:
                this.addFileToSpecifiedDirectory();
                break;
            default:
                this._logService.warning('Sorry, we were not able to process your request.');
                break;
        }
    }

    addFileToCurrentDirectory(): void {
        let fileName = program.args[1];
        if (!this._fileService.getManifestFile('./')) {
            this._logService.warning('Sorry, this is not a directory you can add styles to or you may be missing parameters.');
        } else {
            this.processNewFile('.', fileName);
        }
    }

    addFileToSpecifiedDirectory(): void {
        let styleDirectory = program.args[1];
        let fileName = program.args[2];
        let directoryName = this._directoryService.findDirectoryByName(styleDirectory);

        if(directoryName) {
            let pathToDirectory = this._directoryService.findDirectory(directoryName);
            if (pathToDirectory) {
                this.processNewFile(pathToDirectory, fileName);
            } else {
                this._logService.warning('Sorry, the directory you specified was not found.');
            }
        } else {
            this._logService.warning('Please specify a directory.');
        }
    }

    processNewFile(pathToDirectory: string, fileName: string) {
        let extension = this._fileService.getFileExtension(pathToDirectory);
        let newFile = this.getNewFile(fileName, extension);
        let manifestFile = `${pathToDirectory}/${this._fileService.getManifestFile(pathToDirectory)}`;

        if (!this._fileService.fileExists(`${pathToDirectory}/${newFile}`)) {
            let pathToRoot = this.getPathToRoot(fileName);
            let importStatement = this._config.importAbstracts == 'true' && !pathToDirectory.includes('00_Abstracts') ? `@import "${pathToRoot}00_Abstracts/index${extension}";` : '';
            this._fileService.saveFile(`${pathToDirectory}/${newFile}`, importStatement);

            if (this._config.addToManifest == 'true')
                this._fileService.updateManifest(newFile, manifestFile);
        } else {
            this._logService.warning(newFile + ' already exists.');
        }
    }

    getNewFile(fileName: string, extension: string) {
        let directories = fileName.split('/');

        if (directories.length > 1) {
            directories[directories.length - 1] = `_${directories[directories.length - 1]}${extension}`;
            return directories.join('/');
        }

        return `_${fileName}${extension}`;
    }

    getPathToRoot(fileName: string) {
        let pathDepth = fileName.split('/').length;
        let pathToRoot = '../';

        for (let i = 1; i < pathDepth; i++) {
            pathToRoot += '../';
        }
        
        return pathToRoot;
    }
}