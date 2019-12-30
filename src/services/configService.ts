import { prompt } from "inquirer";
import { IClarionConfig, projectData } from '../data/projectData';
import { IFileService, FileService } from "../services/fileService";
import { ILogService, LogService } from "./logService";

interface IConfig {
    paths: {
        styles: string,
    },
    format: {
        styles: string,
    },
    addToManifest: boolean,
    importAbstracts: boolean
}

export interface IConfigService {
    getConfigData(): any;
    updateConfigInfo(): void;
}

export class ConfigService implements IConfigService {
    _fileService: IFileService = new FileService();
    _logger: ILogService = new LogService();
    _configFileName = 'clarion-config.json';

    getConfigData(): IClarionConfig {
        if (this._fileService.fileExists('./' + this._configFileName)) {
            let config = this._fileService.readFile('./' + this._configFileName);

            return JSON.parse(config);
        }

        return projectData.clarionConfig;
    }

    async updateConfigInfo() {
        let responses = await this.promptUserInput();
        let config = this.updateConfigData(responses);
        this._fileService.saveFile(this._configFileName, JSON.stringify(config, null, '\t'));
    }

    updateConfigData(responses: any): IConfig {
        return {
            paths: {
                styles: responses.stylePath || './src',
            },
            format: {
                styles: responses.styleFormat || 'scss',
            },
            addToManifest: responses.addToManifest === true,
            importAbstracts: responses.importAbstracts === true
        };
    }

    async promptUserInput() {
        let questions = [
            {
                type: "input",
                name: "stylePath",
                message: "What is the path to your styles directory?",
                default: "./src",
                validate: value => value.length > 0 || "This questions is required."
            },
            {
                type: "input",
                name: "styleFormat",
                message: "What format are your styles in?",
                default: "scss",
                validate: value => value.length > 0 || "Project Name is required."
            },
            {
                type: "confirm",
                name: "addToManifest",
                message: "Would you like a reference to your new style sheets to automatically be added to the directory manifest (it's very convenient)?",
                default: "y"
            },
            {
                type: "confirm",
                name: "importAbstracts",
                message: "Would you like a reference to your abstracts to automatically be added to your new style sheets (again, it's very convenient)?",
                default: "y"
            }
        ];

        return await prompt(questions);;
    }
}