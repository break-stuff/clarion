import * as path from "path";
import * as fs from "fs";
import * as program from "commander";
import * as chalk from 'chalk';
import { data } from './data';

export interface IFileManager {
    saveFile(destination: string, content: string): void;
    createDirectory(pathName: string): void;
    getFullFileName(fileName: string, manifestFile: string): string;
    fileExists(fileName: string): boolean;
    directoryExists(directoryName: string): boolean;
    getManifestFile(filePath: string): string;
    getFileExtension(directory: string): string;
    findDirectoryByName(directoryName: string): string;
    updateManifest(fileName: string, manifestFile: string): void;
    removeFile(filePath: string): void;
    findDirectory(directory: string): string;
    readFile(filePath: string): string;
    getStyleFormat(extension:string): string;
}

export class FileManager implements IFileManager {
    saveFile(destination: string, content: string): void {
        try {
            fs.writeFileSync(destination, content);
        } catch (error) {
            console.log(chalk.red(`There was an error saving this file: ${destination} \n${error}`));
        }
        console.log(chalk.blue(`Saved file:        ${destination}`));
    }

    createDirectory(pathName: string): void {
        try {
            fs.mkdirSync(pathName);
        } catch (error) {
            console.log(chalk.red(`There was an error creating this directory: ${pathName} \n${error}`));
        }
        console.log(chalk.green(`Created directory: ${pathName}`));
    }

    getFullFileName(fileName: string, manifestFile: string): string {
        let fullName = undefined;
        let extension = this.getFileExtension(null);

        if (this.fileExists(fileName)) {
            fullName = fileName;
        } else if (this.fileExists(fileName + extension)) {
            fullName = fileName + extension;
        }
        return fileName;
    }

    fileExists(fileName: string): boolean {
        try {
            return fs.statSync(fileName).isFile();
        } catch (err) {
            console.log('Could not find file: ' + fileName);
            return false;
        }
    }

    directoryExists(directoryName: string): boolean {
        try {
            return fs.statSync(directoryName).isDirectory();
        } catch (err) {
            return false;
        }
    }


    getManifestFile(filePath: string): string {
        if (!filePath) return undefined;

        let manifestFile;

        fs.readdirSync(filePath).forEach(file => {
            if (file.startsWith('_index'))
                manifestFile = file;
        });

        return manifestFile;
    }

    getFileExtension(directory: string): string {
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

    getManifestExtension(directory: string): string {
        let manifest = this.getManifestFile(directory);
        return manifest ? path.extname(manifest) : '.scss';
    }

    findDirectoryByName(directoryName: string): string {
        let directory: string;

        if (directoryName) {
            directory = data.directories.find(x => {
                return x.toLowerCase().includes(directoryName.toLowerCase());
            });
        }

        return directory;
    }

    updateManifest(fileName: string, manifestFile: string): void {
        switch (program.args[0]) {
            case 'add':
                this.addFileToManifest(fileName, manifestFile);
                break;
            case 'remove':
                this.removeFileFromManifest(fileName, manifestFile);
                break;
            default:
                console.log(chalk.yellow('Sorry, we were not able to process your request.'));
                break;
        }
    }

    addFileToManifest(fileName: string, manifestFile: string): void {
        fs.appendFileSync(manifestFile, `@import '${fileName}';\n`);
        console.log(chalk.green(`Saved file:        ${fileName} was added to the manifest.`));
    }

    removeFileFromManifest(fileName: string, manifestFile: string): void {
        let importStatements = this.readFile(manifestFile).split('\n');
        let fileIndex = importStatements.indexOf(`@import '${fileName}';`);
        if (fileIndex < 0) {
            console.log(chalk.yellow('File to be removed was not found in your manifest.'));
        } else {
            importStatements.splice(fileIndex, 1);
            let formattedImportStatements = importStatements.join('\n');
            this.saveFile(manifestFile, formattedImportStatements);
        }
    }

    removeFile(filePath: string): void {
        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            console.log(chalk.red(`There was an error removing this file: ${filePath} \n${error}`));
        }
        console.log(chalk.blue(`File removed:      ${filePath}`));
    }


    findDirectory(directory: string): string {
        let pathToDirectory = '';

        if (this.directoryExists(`./${directory}`)) {
            pathToDirectory = `./${directory}`;
        } else {
            data.styleTypes.forEach(x => {
                if (this.directoryExists(`./src/${x}/${directory}`)) {
                    pathToDirectory = `./src/${x}/${directory}`;
                }
            });
        }

        return pathToDirectory;
    }

    readFile(filePath: string): string {
        let contents = '';

        if(this.fileExists(filePath))
            contents = fs.readFileSync(filePath).toString();

        return contents;
    }

    getStyleFormat(extension:string): string {
        return extension.replace('.', '') === 'less' ? 'less' : 'sass';
    }
}