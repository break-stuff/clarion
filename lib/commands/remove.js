"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
const logService_1 = require("../services/logService");
const directoryService_1 = require("../services/directoryService");
class Remove {
    constructor() {
        this._fileService = new fileService_1.FileService();
        this._logService = new logService_1.LogService();
        this._directoryService = new directoryService_1.DirectoryService();
    }
    removeFileFromCurrentDirectory(fileName) {
        if (!this._fileService.getManifestFile('./')) {
            this._logService.warning('Sorry, this is not a directory you can remove styles from or you may be missing parameters.');
        }
        else {
            this.processFileRemoval('.', fileName);
        }
    }
    removeFileFromSpecifiedDirectory(dir, fileName) {
        let directoryName = this._directoryService.findDirectoryByName(dir);
        if (directoryName) {
            let pathToDirectory = this._directoryService.findDirectory(directoryName);
            if (pathToDirectory) {
                this.processFileRemoval(pathToDirectory, fileName);
            }
            else {
                this._logService.warning("Sorry, the directory you specified was not found.");
            }
        }
        else {
            this._directoryService.promptForMissingDirectory()
                .then(directory => this.removeFileFromSpecifiedDirectory(directory, fileName));
        }
    }
    processFileRemoval(pathToDirectory, fileName) {
        let extension = this._fileService.getFileExtension(pathToDirectory);
        let fileToRemove = `_${fileName}.${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileService.getManifestFile(pathToDirectory)}`;
        this._fileService.removeFile(`${pathToDirectory}/${fileToRemove}`);
        this._fileService.removeFileFromManifest(fileToRemove, manifestFile);
    }
}
exports.Remove = Remove;
