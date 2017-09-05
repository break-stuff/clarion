import * as program from "commander";
import { FileService, IFileService } from "../services/fileService";
import { ILogService, LogService } from "../services/logService";
import { IDirectoryService, DirectoryService } from "../services/directoryService";

export interface IAdd {
    addNewFile(): void;
}

export class Add implements IAdd {
    _fileService: IFileService = new FileService();
    _logService: ILogService = new LogService();
    _directoryService: IDirectoryService = new DirectoryService();

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
        let directory = this._directoryService.findDirectoryByName(program.args[1]);
        if (directory) {
            this._logService.warning('Please add the name of a file to create.');
        } else {
            this.processNewFile('.', program.args[1]);
        }
    }

    addFileToSpecifiedDirectory(): void {
        let directoryName = this._directoryService.findDirectoryByName(program.args[1]);
        let pathToDirectory = this._directoryService.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processNewFile(pathToDirectory, program.args[2]);
        } else {
            this._logService.warning('Sorry, the directory you specified was not found.');
        }
    }

    processNewFile(pathToDirectory: string, fileName: string) {
        let extension = this._fileService.getFileExtension(pathToDirectory);
        let newFile = `_${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileService.getManifestFile(pathToDirectory)}`;

        if (!this._fileService.fileExists(`${pathToDirectory}/${newFile}`)) {
            this._fileService.saveFile(`${pathToDirectory}/${newFile}`, `@import "../00_Abstracts/index${extension}"`);
            this._fileService.updateManifest(newFile, manifestFile);
        } else {
            this._logService.warning(newFile + ' already exists.');
        }
    }
}