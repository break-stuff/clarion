import * as program from "commander";
import { FileService, IFileService } from "../services/fileService";
import { ILogService, LogService } from "../services/logService";
import { IDirectoryService, DirectoryService } from "../services/directoryService";

export interface IRemove {
    removeFile(): void;
}

export class Remove implements IRemove {
    _fileService: IFileService = new FileService();
    _logService: ILogService = new LogService();
    _directoryService: IDirectoryService = new DirectoryService();

    removeFile(): void {
        switch (program.args.length) {
            case 1:
                this._logService.warning('Please add the name of a file to be removed.');
                break;
            case 2:
                this.removeFileFromCurrentDirectory();
                break;
            case 3:
                this.removeFileFromSpecifiedDirectory();
                break;
            default:
                this._logService.warning('Sorry, we were not able to process your request.');
                break;
        }
    }

    removeFileFromCurrentDirectory(): void {
        let fileName = program.args[1];
        if (!this._fileService.getManifestFile('./')) {
            this._logService.warning('Sorry, this is not a directory you can remove styles from or you may be missing parameters.');
        } else {
            this.processFileRemoval('.', program.args[1]);
        }
    }

    removeFileFromSpecifiedDirectory(): void {
        let styleDirectory = program.args[1];
        let fileName = program.args[2];
        let directoryName = this._directoryService.findDirectoryByName(styleDirectory);
        let pathToDirectory = this._directoryService.findDirectory(directoryName);
        
        if (pathToDirectory) {
            this.processFileRemoval(pathToDirectory, fileName);
        } else {
            this._logService.warning('Sorry, the directory you specified was not found.');
        }
    }

    processFileRemoval(pathToDirectory: string, fileName: string): void {
        let extension = this._fileService.getFileExtension(pathToDirectory);
        let fileToRemove = `_${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileService.getManifestFile(pathToDirectory)}`;
        this._fileService.removeFile(`${pathToDirectory}/${fileToRemove}`);
        this._fileService.updateManifest(fileToRemove, manifestFile, false);
    }
}