"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const projectData_1 = require("../data/projectData");
const logService_1 = require("./logService");
const configService_1 = require("./configService");
class DirectoryService {
    constructor() {
        this._logger = new logService_1.LogService();
        this._configService = new configService_1.ConfigService();
        this._config = this._configService.getConfigData();
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
        let directories = this.getAllStyleDirectories();
        if (directoryName) {
            directory = directories.find(x => {
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
            projectData_1.projectData.styleTypes.forEach(x => {
                let proposedPath = path.resolve(this.findStyleRootDirectory(), directory);
                if (this.directoryExists(proposedPath)) {
                    pathToDirectory = proposedPath;
                }
            });
        }
        return pathToDirectory;
    }
    getAllStyleDirectories() {
        let config = this._configService.getConfigData();
        let stylePath = this.findStyleRootDirectory();
        let directories = this.getDirectoriesInDirectory(stylePath);
        return directories;
    }
    findStyleRootDirectory() {
        let stylesDirectory = '';
        projectData_1.projectData.styleTypes.forEach(type => {
            let proposedPath = path.resolve('./', this._config.paths.styles, type);
            if (this.directoryExists(proposedPath)) {
                stylesDirectory = proposedPath;
            }
        });
        return stylesDirectory;
    }
    getDirectoriesInDirectory(path) {
        return fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path + '/' + file).isDirectory();
        });
    }
}
exports.DirectoryService = DirectoryService;
