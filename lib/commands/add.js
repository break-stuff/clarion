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
                this.updateDirectories();
                break;
            default:
                this._logService.warning('Sorry, we were not able to process your request.');
                break;
        }
    }
    addFileToCurrentDirectory() {
        let fileName = program.args[1];
        if (!this._fileService.getManifestFile('./')) {
            this._logService.warning('Sorry, this is not a directory you can add styles to or you may be missing parameters.');
        }
        else {
            this.processNewFile('.', fileName);
        }
    }
    updateDirectories() {
        if (program.args[1] === 'directory') {
            this.addNewDirectory();
        }
        else {
            this.addFileToSpecifiedDirectory();
        }
    }
    addNewDirectory() {
        let newDirectory = program.args[2];
        let extension = this._fileService.getFileExtension('/');
        let rootDirectory = this._directoryService.findStyleRootDirectory();
        this._directoryService.createDirectory(`${rootDirectory}/${newDirectory}`);
        this._fileService.saveFile(`${rootDirectory}/${newDirectory}/index${extension}`, '');
        this._fileService.updateManifest(`@import './${newDirectory}/index${extension}';`, `${rootDirectory}/styles${extension}`, true);
    }
    addFileToSpecifiedDirectory() {
        let styleDirectory = program.args[1];
        let fileName = program.args[2];
        let directoryName = this._directoryService.findDirectoryByName(styleDirectory);
        if (directoryName) {
            let pathToDirectory = this._directoryService.findDirectory(directoryName);
            if (pathToDirectory) {
                this.processNewFile(pathToDirectory, fileName);
            }
            else {
                this._logService.warning('Sorry, the directory you specified was not found.');
            }
        }
        else {
            this._logService.warning('Please specify a directory.');
        }
    }
    processNewFile(pathToDirectory, fileName) {
        let extension = this._fileService.getFileExtension(pathToDirectory);
        let newFile = this.getNewFile(fileName, extension);
        let manifestFile = `${pathToDirectory}/${this._fileService.getManifestFile(pathToDirectory)}`;
        if (!this._fileService.fileExists(`${pathToDirectory}/${newFile}`)) {
            let pathToRoot = this.getPathToRoot(fileName);
            let importStatement = this._config.importAbstracts == 'true' && !pathToDirectory.includes('00_Abstracts') ? `@import "${pathToRoot}00_Abstracts/index${extension}";` : '';
            this._fileService.saveFile(`${pathToDirectory}/${newFile}`, importStatement);
            if (this._config.addToManifest == 'true')
                this._fileService.updateManifest(newFile, manifestFile, false);
        }
        else {
            this._logService.warning(newFile + ' already exists.');
        }
    }
    getNewFile(fileName, extension) {
        let directories = fileName.split('/');
        if (directories.length > 1) {
            directories[directories.length - 1] = `_${directories[directories.length - 1]}${extension}`;
            return directories.join('/');
        }
        return `_${fileName}${extension}`;
    }
    getPathToRoot(fileName) {
        let pathDepth = fileName.split('/').length;
        let pathToRoot = '../';
        for (let i = 1; i < pathDepth; i++) {
            pathToRoot += '../';
        }
        return pathToRoot;
    }
}
exports.Add = Add;
