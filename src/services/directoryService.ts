import * as path from "path";
import * as fs from "fs";
import * as program from "commander";
import data from '../data/directories';
import { ILogService, LogService } from "./logService";
import { IConfigService, ConfigService } from "./configService";


export interface IDirectoryService {
    createDirectory(pathName: string): void;
    directoryExists(directoryName: string): boolean;
    findDirectoryByName(directoryName: string): string;
    findDirectory(directory: string): string;
}

export class DirectoryService implements IDirectoryService {
    _logger: ILogService = new LogService();
    _configService: IConfigService = new ConfigService();
    _config = this._configService.getConfigData();

    createDirectory(pathName: string): void {
        try {
            pathName = pathName.replace('//', '/');
            fs.mkdirSync(pathName);
            this._logger.success(`Created directory: ${pathName}`);
        } catch (error) {
            this._logger.error(`There was an error creating this directory: ${pathName} \n${error}`);
        }
    }

    directoryExists(directoryName: string): boolean {
        try {
            return fs.statSync(directoryName).isDirectory();
        } catch (err) {
            return false;
        }
    }

    findDirectoryByName(directoryName: string): string {
        let directory: string;
        let directories = this.getAllStyleDirectories();

        if (directoryName) {
            directory = directories.find(x => {
                return x.toLowerCase().includes(directoryName.toLowerCase());
            });
        }

        return directory;
    }

    findDirectory(directory: string): string {
        let pathToDirectory = '';

        if (this.directoryExists(`./${directory}`)) {
            pathToDirectory = `./${directory}`;
        } else {
            data.styleTypes.forEach(x => {
                let proposedPath = path.resolve(this.findStyleRootDirectory(), directory);
                if (this.directoryExists(proposedPath)) {
                    pathToDirectory = proposedPath;
                }
            });
        }

        return pathToDirectory;
    }

    getAllStyleDirectories(): string[] {
        let config = this._configService.getConfigData();
        let stylePath = this.findStyleRootDirectory();
        console.log(stylePath);
        let directories = this.getDirectoriesInDirectory(stylePath);
        console.log(directories);

        return directories;
    }

    findStyleRootDirectory(): string {
        let stylesDirectory = '';
        
        data.styleTypes.forEach(type => {
            let proposedPath = path.resolve('./', this._config.paths.styles, type);
            if (this.directoryExists(proposedPath)) {
                stylesDirectory = proposedPath;
            }
        });

        return stylesDirectory;
    }

    getDirectoriesInDirectory(path): string[] {
        return fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path+'/'+file).isDirectory();
        });
    }
}