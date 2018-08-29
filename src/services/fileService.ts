import * as path from "path";
import * as fs from "fs";
import * as program from "commander";
import { ILogService, LogService } from "./logService";

export interface IFileService {
    saveFile(destination: string, content: string): void;
    fileExists(fileName: string): boolean;
    getManifestFile(filePath: string): string;
    getFileExtension(directory: string): string;
    updateManifest(fileName: string, manifestFile: string, sort: boolean): void;
    removeFile(filePath: string): void;
    readFile(filePath: string): string;
    getStyleFormat(extension: string): string;
}

export class FileService implements IFileService {
    _logger: ILogService = new LogService();

    saveFile(destination: string, content: string): void {
        try {
            destination = destination.replace('//', '/');
            fs.writeFileSync(destination, content);
            this._logger.success(`Saved file:        ${destination}`);
        } catch (error) {
            this._logger.error(`There was an error saving this file: ${destination} \n${error}`);
        }
    }

    fileExists(fileName: string): boolean {
        try {
            return fs.statSync(fileName).isFile();
        } catch (err) {
            return false;
        }
    }


    getManifestFile(filePath: string): string {
        if (!filePath) return undefined;

        let manifestFile;

        fs.readdirSync(filePath).forEach(file => {
            if (file.startsWith('index') || file.startsWith('style'))
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

    updateManifest(fileName: string, manifestFile: string, sort: boolean): void {
        if (this.fileExists(manifestFile)) {
            switch (program.args[0]) {
                case 'add':
                    this.addFileToManifest(fileName, manifestFile, sort);
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

    addFileToManifest(fileName: string, manifestFile: string, sort: boolean): void {
        if(sort) {
            var data = fs.readFileSync(manifestFile, 'utf8');
            let importStatements = data.split('\n').filter(String);
            importStatements.push(fileName);
            importStatements.sort();
            this.saveFile(manifestFile, importStatements.join('\n'));
        } else {
            fs.appendFileSync(manifestFile, `@import '${fileName}';\n`);
        }

        this._logger.success(`Saved file:        ${fileName} was added to the manifest.`);
    }

    removeFileFromManifest(fileName: string, manifestFile: string): void {
        let importStatements = this.readFile(manifestFile).split('\n');
        let fileIndex = importStatements.indexOf(`@import '${fileName}';`);
        
        if (fileIndex < 0) {
            this._logger.warning('File to be removed was not found in your manifest.');
        } else {
            importStatements.splice(fileIndex, 1);
            let formattedImportStatements = importStatements.join('\n');
            this.saveFile(manifestFile, formattedImportStatements);
        }
    }

    removeFile(filePath: string): void {
        try {
            if (this.fileExists(filePath)) {
                fs.unlinkSync(filePath);
                this._logger.success(`File removed:      ${filePath}`);                
            } else {
                this._logger.warning(filePath + ' was not found');
            }
        } catch (error) {
            this._logger.error(`There was an error removing this file: ${filePath} \n${error}`);
        }
    }


    readFile(filePath: string): string {
        return this.fileExists(filePath) ? fs.readFileSync(filePath).toString() : '';
    }

    getStyleFormat(extension: string): string {
        return extension.replace('.', '') === 'less' ? 'less' : 'sass';
    }
}