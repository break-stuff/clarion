import * as program from "commander";
import * as chalk from 'chalk';
import { FileManager, IFileManager } from "../fileManager";

export interface IRemove {
    removeFile(): void;
}

export class Remove implements IRemove {
    fileManager: IFileManager = new FileManager();
    removeFile(): void {
        switch (program.args.length) {
            case 1:
                console.log(chalk.yellow('Please add the name of a file to be removed.'));
                break;
            case 2:
                this.removeFileFromCurrentDirectory();
                break;
            case 3:
                this.removeFileFromSpecifiedDirectory();
                break;
            default:
                console.log(chalk.yellow('Sorry, we were not able to process your request.'));
                break;
        }
    }

    removeFileFromCurrentDirectory(): void {
        let directory = this.fileManager.findDirectoryByName(program.args[1]);
        if (directory) {
            console.log(chalk.yellow('Please add the name of a file to be removed.'));
        } else {
            this.processFileRemoval('.', program.args[1]);
            // let extension = this.fileManager.getFileExtension('./');
            // let fileToRemove = `./${program.args[1]}${extension}`;
            // let manifestFile = `./${this.fileManager.getManifestFile('./')}`;
            // this.fileManager.removeFile(fileToRemove);
            // this.fileManager.updateManifest(fileToRemove, manifestFile);
        }
    }

    removeFileFromSpecifiedDirectory(): void {
        let directoryName = this.fileManager.findDirectoryByName(program.args[1]);
        let pathToDirectory = this.fileManager.findDirectory(directoryName);
        if (pathToDirectory) {
            this.processFileRemoval(pathToDirectory, program.args[2]);
            // let extension = this.fileManager.getFileExtension(pathToDirectory);
            // let fileToRemove = `${program.args[2]}${extension}`;
            // let manifestFile = `${pathToDirectory}/${this.fileManager.getManifestFile(pathToDirectory)}`;
            // this.fileManager.removeFile(`${pathToDirectory}/${fileToRemove}`);
            // this.fileManager.updateManifest(fileToRemove, manifestFile);
        } else {
            console.log(chalk.yellow('Sorry, the directory you specified was not found.'));
        }
    }

    processFileRemoval(pathToDirectory: string, fileName: string): void {
        let extension = this.fileManager.getFileExtension(pathToDirectory);
        let fileToRemove = `${fileName}${extension}`;
        let manifestFile = `${pathToDirectory}/${this.fileManager.getManifestFile(pathToDirectory)}`;
        this.fileManager.removeFile(`${pathToDirectory}/${fileToRemove}`);
        this.fileManager.updateManifest(fileToRemove, manifestFile);
    }
}