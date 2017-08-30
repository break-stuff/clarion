import * as program from "commander";
import * as chalk from 'chalk';
import { FileManager, IFileManager } from "../fileManager";

export interface IAdd {
    addNewFile(): void;
}

export class Add implements IAdd {
    _fileManager: IFileManager = new FileManager();

    addNewFile(): void {
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

    addFileToCurrentDirectory(): void {
        let directory = this._fileManager.findDirectoryByName(program.args[1]);
        if (directory) {
            console.log(chalk.yellow('Please add the name of a file to create.'));
        } else {
            this.processNewFile('.', program.args[1]);
        }
    }

    addFileToSpecifiedDirectory(): void {
        let directoryName = this._fileManager.findDirectoryByName(program.args[1]);
        let pathToDirectory = this._fileManager.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processNewFile(pathToDirectory, program.args[2]);
        } else {
            console.log(chalk.yellow('Sorry, the directory you specified was not found.'));
        }
    }

    processNewFile(pathToDirectory: string, fileName: string) {
        let extension = this._fileManager.getFileExtension(pathToDirectory);
        let newFile = `${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileManager.getManifestFile(pathToDirectory)}`;
        this._fileManager.saveFile(`${pathToDirectory}/${newFile}`, '');
        this._fileManager.updateManifest(newFile, manifestFile);
    }
}