"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const chalk = require("chalk");
const fileManager_1 = require("../fileManager");
class Add {
    constructor() {
        this.fileManager = new fileManager_1.FileManager();
    }
    addNewFile() {
        switch (program.args.length) {
            case 1:
                console.log(chalk.yellow('Please add the name of a file to create.'));
                break;
            case 2:
                this.addFileToCurrentDirectory();
                break;
            case 3:
                this.addFileToSpecifiedDirectory();
                break;
            default:
                console.log(chalk.yellow('Sorry, we were not able to process your request.'));
                break;
        }
    }
    addFileToCurrentDirectory() {
        let directory = this.fileManager.findDirectoryByName(program.args[1]);
        if (directory) {
            console.log(chalk.yellow('Please add the name of a file to create.'));
        }
        else {
            this.processNewFile('.', program.args[1]);
        }
    }
    addFileToSpecifiedDirectory() {
        let directoryName = this.fileManager.findDirectoryByName(program.args[1]);
        let pathToDirectory = this.fileManager.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processNewFile(pathToDirectory, program.args[2]);
        }
        else {
            console.log(chalk.yellow('Sorry, the directory you specified was not found.'));
        }
    }
    processNewFile(pathToDirectory, fileName) {
        let extension = this.fileManager.getFileExtension(pathToDirectory);
        let newFile = `${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this.fileManager.getManifestFile(pathToDirectory)}`;
        this.fileManager.saveFile(`${pathToDirectory}/${newFile}`, '');
        this.fileManager.updateManifest(newFile, manifestFile);
    }
}
exports.Add = Add;
