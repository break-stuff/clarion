"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const program = require("commander");
const data_1 = require("./data");
const logManager_1 = require("./logManager");
class FileManager {
    constructor() {
        this._logger = new logManager_1.LogManager();
    }
    saveFile(destination, content) {
        try {
            fs.writeFileSync(destination, content);
            this._logger.success(`Saved file:        ${destination}`);
        }
        catch (error) {
            this._logger.error(`There was an error saving this file: ${destination} \n${error}`);
        }
    }
    createDirectory(pathName) {
        try {
            fs.mkdirSync(pathName);
            this._logger.success(`Created directory: ${pathName}`);
        }
        catch (error) {
            this._logger.error(`There was an error creating this directory: ${pathName} \n${error}`);
        }
    }
    getFullFileName(fileName, manifestFile) {
        let fullName = undefined;
        let extension = this.getFileExtension(null);
        if (this.fileExists(fileName)) {
            fullName = fileName;
        }
        else if (this.fileExists(fileName + extension)) {
            fullName = fileName + extension;
        }
        return fileName;
    }
    fileExists(fileName) {
        try {
            return fs.statSync(fileName).isFile();
        }
        catch (err) {
            return false;
        }
    }
    directoryExists(directoryName) {
        try {
            return fs.statSync(directoryName).isDirectory();
        }
        catch (err) {
            return false;
        }
    }
    getManifestFile(filePath) {
        if (!filePath)
            return undefined;
        let manifestFile;
        fs.readdirSync(filePath).forEach(file => {
            if (file.startsWith('_index'))
                manifestFile = file;
        });
        return manifestFile;
    }
    getFileExtension(directory) {
        switch (true) {
            case program.sass:
                return '.sass';
            case program.scss:
                return '.scss';
            case program.less:
                return '.less';
            default:
                return this.getManifestExtension(directory);
        }
    }
    getManifestExtension(directory) {
        let manifest = this.getManifestFile(directory);
        return manifest ? path.extname(manifest) : '.scss';
    }
    findDirectoryByName(directoryName) {
        let directory;
        if (directoryName) {
            directory = data_1.data.directories.find(x => {
                return x.toLowerCase().includes(directoryName.toLowerCase());
            });
        }
        return directory;
    }
    updateManifest(fileName, manifestFile) {
        if (this.fileExists(manifestFile)) {
            switch (program.args[0]) {
                case 'add':
                    this.addFileToManifest(fileName, manifestFile);
                    break;
                case 'remove':
                    this.removeFileFromManifest(fileName, manifestFile);
                    break;
                default:
                    this._logger.warning('Sorry, we were not able to process your request.');
                    break;
            }
        }
    }
    addFileToManifest(fileName, manifestFile) {
        fs.appendFileSync(manifestFile, `@import '${fileName}';\n`);
        this._logger.success(`Saved file:        ${fileName} was added to the manifest.`);
    }
    removeFileFromManifest(fileName, manifestFile) {
        let importStatements = this.readFile(manifestFile).split('\n');
        let fileIndex = importStatements.indexOf(`@import '${fileName}';`);
        if (fileIndex < 0) {
            this._logger.warning('File to be removed was not found in your manifest.');
        }
        else {
            importStatements.splice(fileIndex, 1);
            let formattedImportStatements = importStatements.join('\n');
            this.saveFile(manifestFile, formattedImportStatements);
        }
    }
    removeFile(filePath) {
        try {
            if (this.fileExists(filePath)) {
                fs.unlinkSync(filePath);
            }
            else {
                this._logger.warning(filePath + ' was not found');
            }
        }
        catch (error) {
            this._logger.error(`There was an error removing this file: ${filePath} \n${error}`);
        }
        this._logger.success(`File removed:      ${filePath}`);
    }
    findDirectory(directory) {
        let pathToDirectory = '';
        if (this.directoryExists(`./${directory}`)) {
            pathToDirectory = `./${directory}`;
        }
        else {
            data_1.data.styleTypes.forEach(x => {
                if (this.directoryExists(`./src/${x}/${directory}`)) {
                    pathToDirectory = `./src/${x}/${directory}`;
                }
            });
        }
        return pathToDirectory;
    }
    readFile(filePath) {
        let contents = '';
        if (this.fileExists(filePath))
            contents = fs.readFileSync(filePath).toString();
        return contents;
    }
    getStyleFormat(extension) {
        return extension.replace('.', '') === 'less' ? 'less' : 'sass';
    }
}
exports.FileManager = FileManager;
