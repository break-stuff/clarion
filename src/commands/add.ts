import * as program from "commander";
import { FileManager, IFileManager } from "../fileManager";
import { ILogManager, LogManager } from "../logManager";

export interface IAdd {
    addNewFile(): void;
}

export class Add implements IAdd {
    _fileManager: IFileManager = new FileManager();
    _logManager: ILogManager = new LogManager();

    addNewFile(): void {
        switch (program.args.length) {
            case 1:
                this._logManager.warning('Please add the name of a file to create.');
                break;
            case 2:
                this.addFileToCurrentDirectory();
                break;
            case 3:
                this.addFileToSpecifiedDirectory();
                break;
            default:
                this._logManager.warning('Sorry, we were not able to process your request.');
                break;
        }
    }

    addFileToCurrentDirectory(): void {
        let directory = this._fileManager.findDirectoryByName(program.args[1]);
        if (directory) {
            this._logManager.warning('Please add the name of a file to create.');
        } else {
            this.processNewFile('.', program.args[1]);
        }
    }

    addFileToSpecifiedDirectory(): void {
        let directoryName = this._fileManager.findDirectoryByName(program.args[1]);
        let pathToDirectory = this._fileManager.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processNewFile(pathToDirectory, program.args[2]);
        } else {
            this._logManager.warning('Sorry, the directory you specified was not found.');
        }
    }

    processNewFile(pathToDirectory: string, fileName: string) {
        let extension = this._fileManager.getFileExtension(pathToDirectory);
        let newFile = `${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileManager.getManifestFile(pathToDirectory)}`;

        if (!this._fileManager.fileExists(`${pathToDirectory}/${newFile}`)) {
            this._fileManager.saveFile(`${pathToDirectory}/${newFile}`, '');
            this._fileManager.updateManifest(newFile, manifestFile);
        } else {
            this._logManager.warning(newFile + ' already exists.');
        }
    }
}