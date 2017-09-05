"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fileService_1 = require("../services/fileService");
const logService_1 = require("../services/logService");
const directoryService_1 = require("../services/directoryService");
class Remove {
    constructor() {
        this._fileService = new fileService_1.FileService();
        this._logService = new logService_1.LogService();
        this._directoryService = new directoryService_1.DirectoryService();
    }
    removeFile() {
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
    removeFileFromCurrentDirectory() {
        let directory = this._directoryService.findDirectoryByName(program.args[1]);
        if (directory) {
            this._logService.warning('Please add the name of a file to be removed.');
        }
        else {
            this.processFileRemoval('.', program.args[1]);
        }
    }
    removeFileFromSpecifiedDirectory() {
        let directoryName = this._directoryService.findDirectoryByName(program.args[1]);
        let pathToDirectory = this._directoryService.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processFileRemoval(pathToDirectory, program.args[2]);
        }
        else {
            this._logService.warning('Sorry, the directory you specified was not found.');
        }
    }
    processFileRemoval(pathToDirectory, fileName) {
        let extension = this._fileService.getFileExtension(pathToDirectory);
        let fileToRemove = `_${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileService.getManifestFile(pathToDirectory)}`;
        this._fileService.removeFile(`${pathToDirectory}/${fileToRemove}`);
        this._fileService.updateManifest(fileToRemove, manifestFile);
    }
}
exports.Remove = Remove;
