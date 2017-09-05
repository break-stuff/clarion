"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const directories_1 = require("../data/directories");
const logService_1 = require("./logService");
class DirectoryService {
    constructor() {
        this._logger = new logService_1.LogService();
    }
    createDirectory(pathName) {
        try {
            pathName = pathName.replace('//', '/');
            fs.mkdirSync(pathName);
            this._logger.success(`Created directory: ${pathName}`);
        }
        catch (error) {
            this._logger.error(`There was an error creating this directory: ${pathName} \n${error}`);
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
    findDirectoryByName(directoryName) {
        let directory;
        if (directoryName) {
            directory = directories_1.default.directories.find(x => {
                return x.toLowerCase().includes(directoryName.toLowerCase());
            });
        }
        return directory;
    }
    findDirectory(directory) {
        let pathToDirectory = '';
        if (this.directoryExists(`./${directory}`)) {
            pathToDirectory = `./${directory}`;
        }
        else {
            directories_1.default.styleTypes.forEach(x => {
                if (this.directoryExists(`./src/${x}/${directory}`)) {
                    pathToDirectory = `./src/${x}/${directory}`;
                }
            });
        }
        return pathToDirectory;
    }
}
exports.DirectoryService = DirectoryService;
