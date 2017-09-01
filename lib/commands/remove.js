"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fileManager_1 = require("../fileManager");
const logManager_1 = require("../logManager");
class Remove {
    constructor() {
        this._fileManager = new fileManager_1.FileManager();
        this._logManager = new logManager_1.LogManager();
    }
    removeFile() {
        switch (program.args.length) {
            case 1:
                this._logManager.warning('Please add the name of a file to be removed.');
                break;
            case 2:
                this.removeFileFromCurrentDirectory();
                break;
            case 3:
                this.removeFileFromSpecifiedDirectory();
                break;
            default:
                this._logManager.warning('Sorry, we were not able to process your request.');
                break;
        }
    }
    removeFileFromCurrentDirectory() {
        let directory = this._fileManager.findDirectoryByName(program.args[1]);
        if (directory) {
            this._logManager.warning('Please add the name of a file to be removed.');
        }
        else {
            this.processFileRemoval('.', program.args[1]);
        }
    }
    removeFileFromSpecifiedDirectory() {
        let directoryName = this._fileManager.findDirectoryByName(program.args[1]);
        let pathToDirectory = this._fileManager.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processFileRemoval(pathToDirectory, program.args[2]);
        }
        else {
            this._logManager.warning('Sorry, the directory you specified was not found.');
        }
    }
    processFileRemoval(pathToDirectory, fileName) {
        let extension = this._fileManager.getFileExtension(pathToDirectory);
        let fileToRemove = `${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileManager.getManifestFile(pathToDirectory)}`;
        this._fileManager.removeFile(`${pathToDirectory}/${fileToRemove}`);
        this._fileManager.updateManifest(fileToRemove, manifestFile);
    }
}
exports.Remove = Remove;
