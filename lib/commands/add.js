"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fileManager_1 = require("../fileManager");
const logManager_1 = require("../logManager");
class Add {
    constructor() {
        this._fileManager = new fileManager_1.FileManager();
        this._logManager = new logManager_1.LogManager();
    }
    addNewFile() {
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
    addFileToCurrentDirectory() {
        let directory = this._fileManager.findDirectoryByName(program.args[1]);
        if (directory) {
            this._logManager.warning('Please add the name of a file to create.');
        }
        else {
            this.processNewFile('.', program.args[1]);
        }
    }
    addFileToSpecifiedDirectory() {
        let directoryName = this._fileManager.findDirectoryByName(program.args[1]);
        let pathToDirectory = this._fileManager.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processNewFile(pathToDirectory, program.args[2]);
        }
        else {
            this._logManager.warning('Sorry, the directory you specified was not found.');
        }
    }
    processNewFile(pathToDirectory, fileName) {
        let extension = this._fileManager.getFileExtension(pathToDirectory);
        let newFile = `${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileManager.getManifestFile(pathToDirectory)}`;
        if (!this._fileManager.fileExists(`${pathToDirectory}/${newFile}`)) {
            this._fileManager.saveFile(`${pathToDirectory}/${newFile}`, '');
            this._fileManager.updateManifest(newFile, manifestFile);
        }
        else {
            this._logManager.warning(newFile + ' already exists.');
        }
    }
}
exports.Add = Add;
