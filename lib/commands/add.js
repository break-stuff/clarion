"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fileService_1 = require("../services/fileService");
const logService_1 = require("../services/logService");
const directoryService_1 = require("../services/directoryService");
const configService_1 = require("../services/configService");
class Add {
    constructor() {
        this._fileService = new fileService_1.FileService();
        this._logService = new logService_1.LogService();
        this._directoryService = new directoryService_1.DirectoryService();
        this._configService = new configService_1.ConfigService();
        this._config = this._configService.getConfigData();
    }
    addNewFile() {
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
    addFileToCurrentDirectory() {
        let directory = this._directoryService.findDirectoryByName(program.args[1]);
        if (directory) {
            this._logService.warning('Please add the name of a file to create.');
        }
        else {
            this.processNewFile('.', program.args[1]);
        }
    }
    addFileToSpecifiedDirectory() {
        let directoryName = this._directoryService.findDirectoryByName(program.args[1]);
        let pathToDirectory = this._directoryService.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processNewFile(pathToDirectory, program.args[2]);
        }
        else {
            this._logService.warning('Sorry, the directory you specified was not found.');
        }
    }
    processNewFile(pathToDirectory, fileName) {
        let extension = this._fileService.getFileExtension(pathToDirectory);
        let newFile = `_${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileService.getManifestFile(pathToDirectory)}`;
        if (!this._fileService.fileExists(`${pathToDirectory}/${newFile}`)) {
            let importStatement = this._config.importAbstracts == 'true' && !pathToDirectory.includes('00_Abstracts') ? `@import "../00_Abstracts/index${extension}";` : '';
            this._fileService.saveFile(`${pathToDirectory}/${newFile}`, importStatement);
            if (this._config.addToManifest == 'true')
                this._fileService.updateManifest(newFile, manifestFile);
        }
        else {
            this._logService.warning(newFile + ' already exists.');
        }
    }
}
exports.Add = Add;
