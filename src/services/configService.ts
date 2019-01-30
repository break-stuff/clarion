import { prompt } from "inquirer";
import { IClarionConfig, projectData } from '../data/projectData';
import { IFileService, FileService } from "../services/fileService";
import { ILogService, LogService } from "./logService";

export interface IConfigService {
    saveConfig(property?: string, value?: string): void;
    getConfigData(): any;
    updateConfigInfo(): void;
}

export class ConfigService implements IConfigService {
    _fileService: IFileService = new FileService();
    _logger: ILogService = new LogService();
    _configFileName = 'clarion-config.json';

    saveConfig(property?: string, value?: string): void {
        let config = this.getConfigData();
        if (property)
            config = this.updateConfigProperty(config, property, value);

        if (config)
            this._fileService.saveFile(this._configFileName, JSON.stringify(config, null, '\t'));
    }

    getConfigData(): IClarionConfig {
        if (this._fileService.fileExists('./' + this._configFileName)) {
            let config = this._fileService.readFile('./' + this._configFileName);

            return JSON.parse(config);
        }

        return projectData.clarionConfig;
    }

    updateConfigProperty(config: any, property: string | string[], value: string) {
        let properties = typeof property === "string" ? property.split('.') : property;

        if (properties.length > 1) {
            var p = properties.shift();
            if (config[p] == null || typeof config[p] !== 'object') {
                config[p] = {};
            }
            this.updateConfigProperty(config[p], properties, value);
        } else {
            if (properties[0] in config) {
                config[properties[0]] = value;
            } else {
                this._logger.warning(properties[0] + ' was not found.');
                return false;
            }
        }

        return config;
    }

    updateConfigInfo() {
        let config = {
            paths: {
                styles: "./src",
            },
            format: {
                styles: "scss",
            },
            addToManifest: true,
            importAbstracts: true
        };


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

        prompt(questions)
            .then(answers => {
                config.addToManifest = answers.addToManifest;
                config.format.styles = answers.styleFormat;
                config.importAbstracts = answers.importAbstracts;
                config.paths.styles = answers.stylePath
                
                this._fileService.saveFile(this._configFileName, JSON.stringify(config, null, '\t'));
            });
    }
}